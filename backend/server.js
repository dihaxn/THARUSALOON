const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, 'db.json');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use((req, res, next) => { console.log(new Date().toISOString(), req.method, req.url); next(); });
app.options('*', cors());
app.use(express.json());

let writeQueue = Promise.resolve();

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({
      users: [], services: [], appointments: [], bookings: [],
      products: [], purchaseOrders: [], salesOrders: [], invoices: []
    }, null, 2));
  }
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw || '{}');
}

function writeDB(data) {
  writeQueue = writeQueue.then(() => {
    return new Promise((res, rej) => {
      fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), (err) => {
        if (err) return rej(err); res();
      });
    });
  });
  return writeQueue;
}

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const db = readDB();
  const { name, email, password, role = 'customer' } = req.body;
  if (db.users.find(u => u.email === email)) return res.status(400).json({ message: 'Email already registered' });
  const newUser = { id: uuidv4(), name, email, password, role };
  db.users.push(newUser);
  writeDB(db).then(() => {
    const { password, ...publicUser } = newUser;
    res.json({ user: publicUser, token: `fake-jwt-${newUser.id}` });
  }).catch(err => res.status(500).json({ message: err.message }));
});

app.post('/api/auth/login', (req, res) => {
  const db = readDB();
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const { password: p, ...publicUser } = user;
  res.json({ user: publicUser, token: `fake-jwt-${user.id}` });
});

function requireAuth(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const match = auth.match(/^Bearer fake-jwt-(.+)$/);
  if (!match) return res.status(401).json({ message: 'Missing or invalid token' });
  req.userId = match[1];
  next();
}

app.get('/api/auth/me', requireAuth, (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...publicUser } = user;
  res.json(publicUser);
});

// Services
app.get('/api/services', (req, res) => res.json(readDB().services || []));
app.post('/api/services', requireAuth, (req, res) => {
  const db = readDB();
  const newSvc = { id: uuidv4(), ...req.body };
  db.services = db.services || [];
  db.services.push(newSvc);
  writeDB(db).then(() => res.json(newSvc)).catch(err => res.status(500).json({ message: err.message }));
});

// Appointments
app.get('/api/appointments', requireAuth, (req, res) => res.json(readDB().appointments || []));
app.post('/api/appointments', requireAuth, (req, res) => {
  const db = readDB();
  const appt = { id: uuidv4(), ...req.body, salesOrderId: uuidv4() };
  db.appointments = db.appointments || [];
  db.appointments.push(appt);
  writeDB(db).then(() => res.json(appt)).catch(err => res.status(500).json({ message: err.message }));
});

// Inventory
app.get('/api/inventory/products', requireAuth, (req, res) => res.json(readDB().products || []));
app.post('/api/inventory/products', requireAuth, (req, res) => {
  const db = readDB();
  const newProduct = { id: uuidv4(), ...req.body };
  db.products = db.products || [];
  db.products.push(newProduct);
  writeDB(db).then(() => res.json(newProduct)).catch(err => res.status(500).json({ message: err.message }));
});
app.put('/api/inventory/products/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Product not found' });
  db.products[idx] = { ...db.products[idx], ...req.body };
  writeDB(db).then(() => res.json(db.products[idx])).catch(err => res.status(500).json({ message: err.message }));
});

// Purchase Orders (Owner only)
app.get('/api/purchase-orders', requireAuth, (req, res) => {
  const db = readDB();
  if (db.users.find(u => u.id === req.userId)?.role !== 'owner') return res.status(403).json({ message: 'Owner only' });
  res.json(db.purchaseOrders || []);
});
app.post('/api/purchase-orders', requireAuth, (req, res) => {
  const db = readDB();
  if (db.users.find(u => u.id === req.userId)?.role !== 'owner') return res.status(403).json({ message: 'Owner only' });
  const order = { id: uuidv4(), ...req.body, date: new Date().toISOString().split('T')[0] };
  order.total = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  db.purchaseOrders = db.purchaseOrders || [];
  db.purchaseOrders.push(order);
  if (order.status === 'received') {
    order.items.forEach(item => {
      const prod = db.products.find(p => p.id === item.productId);
      if (prod) prod.stock += item.quantity;
    });
  }
  writeDB(db).then(() => res.json(order)).catch(err => res.status(500).json({ message: err.message }));
});

// Sales Orders
app.get('/api/sales-orders', requireAuth, (req, res) => {
  const db = readDB();
  let orders = db.salesOrders || [];
  const userRole = db.users.find(u => u.id === req.userId)?.role;
  if (userRole === 'customer') orders = orders.filter(o => o.customerId === req.userId);
  res.json(orders);
});
app.post('/api/sales-orders', requireAuth, (req, res) => {
  const db = readDB();
  const order = { id: uuidv4(), ...req.body, date: new Date().toISOString().split('T')[0], status: 'pending' };
  order.subtotal = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  order.total = order.subtotal + (order.tax || 0) - (order.discount || 0);
  db.salesOrders = db.salesOrders || [];
  db.salesOrders.push(order);
  order.items.forEach(item => {
    if (item.productId) {
      const prod = db.products.find(p => p.id === item.productId);
      if (prod && prod.stock >= item.quantity) prod.stock -= item.quantity;
    }
  });
  writeDB(db).then(() => res.json(order)).catch(err => res.status(500).json({ message: err.message }));
});
app.put('/api/sales-orders/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.salesOrders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Order not found' });
  db.salesOrders[idx] = { ...db.salesOrders[idx], ...req.body };
  writeDB(db).then(() => res.json(db.salesOrders[idx])).catch(err => res.status(500).json({ message: err.message }));
});

// Invoices
app.get('/api/invoices', requireAuth, (req, res) => {
  const db = readDB();
  let invoices = db.invoices || [];
  const userRole = db.users.find(u => u.id === req.userId)?.role;
  if (userRole === 'customer') invoices = invoices.filter(inv => db.salesOrders.find(so => so.id === inv.salesOrderId && so.customerId === req.userId));
  res.json(invoices);
});
app.post('/api/invoices', requireAuth, (req, res) => {
  const db = readDB();
  const { salesOrderId } = req.body;
  const salesOrder = db.salesOrders.find(so => so.id === salesOrderId);
  if (!salesOrder) return res.status(404).json({ message: 'Sales order not found' });
  const invoice = { id: uuidv4(), salesOrderId, date: new Date().toISOString().split('T')[0], amount: salesOrder.total, status: 'pending' };
  db.invoices = db.invoices || [];
  db.invoices.push(invoice);
  writeDB(db).then(() => res.json(invoice)).catch(err => res.status(500).json({ message: err.message }));
});

// Root
app.get('/', (req, res) => res.type('text').send(`Tharuu ERP Backend v2.0. Endpoints: /api/services, /api/sales-orders, /api/inventory/products, etc.`));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Tharuu ERP Backend listening on http://localhost:${PORT}`);
});
