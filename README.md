# Tharu Bridal Salon ERP

A comprehensive ERP system for Tharu Bridal Salon built with React (frontend) and Node.js/Express (backend).

## Project Structure

```
tharuu-erp/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── db.json
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    ├── .env
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx
        ├── context/
        │   ├── AuthContext.jsx
        │   └── NotificationContext.jsx
        ├── lib/
        │   └── api.js
        ├── components/
        │   ├── common/
        │   │   ├── ProtectedRoute.jsx
        │   │   ├── NotificationContainer.jsx
        │   │   └── ServiceCard.jsx
        │   └── layout/
        │       ├── Navbar.jsx
        │       └── Footer.jsx
        └── pages/
            ├── Auth/
            │   ├── Login.jsx
            │   └── Register.jsx
            ├── Booking/
            │   └── BookingList.jsx
            ├── Dashboard/
            │   ├── CustomerDashboard.jsx
            │   ├── OwnerDashboard.jsx
            │   └── StaffDashboard.jsx
            ├── Contact/
            │   └── Contact.jsx
            ├── Gallery/
            │   └── Gallery.jsx
            ├── Home/
            │   └── Home.jsx
            ├── Landing/
            │   └── Landing.jsx
            └── Service/
                └── ServiceList.jsx
```

## Features

### Backend (Express + JSON Database)
- RESTful API with Express.js
- JSON-based file storage (db.json)
- Authentication endpoints (login, register, current user)
- Services management
- Appointments management
- Inventory management (products)
- Purchase orders (owner only)
- Sales orders
- Invoice generation

### Frontend (React + Vite + Tailwind CSS)
- Modern React application with React Router
- Context-based authentication system
- Role-based access control (Owner, Staff, Customer)
- Responsive UI with Tailwind CSS
- Form validation with Formik and Yup
- Notification system

### User Roles
1. **Owner**: Full access to all features including inventory, purchase orders, sales orders, and analytics
2. **Staff**: Access to appointments and sales orders management
3. **Customer**: Access to services, bookings, and personal dashboard

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3001`

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

4. Build for production:
```bash
npm run build
```

### Default Users

The system comes with three pre-configured users:

- **Owner**: 
  - Email: `admin@example.com`
  - Password: `password`
  
- **Staff**: 
  - Email: `staff@example.com`
  - Password: `password`
  
- **Customer**: 
  - Email: `jane@example.com`
  - Password: `password`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service (requires authentication)

### Appointments
- `GET /api/appointments` - Get appointments (requires authentication)
- `POST /api/appointments` - Create appointment (requires authentication)

### Inventory
- `GET /api/inventory/products` - Get all products (requires authentication)
- `POST /api/inventory/products` - Create product (requires authentication)
- `PUT /api/inventory/products/:id` - Update product (requires authentication)

### Purchase Orders (Owner only)
- `GET /api/purchase-orders` - Get purchase orders
- `POST /api/purchase-orders` - Create purchase order

### Sales Orders
- `GET /api/sales-orders` - Get sales orders
- `POST /api/sales-orders` - Create sales order
- `PUT /api/sales-orders/:id` - Update sales order

### Invoices
- `GET /api/invoices` - Get invoices
- `POST /api/invoices` - Create invoice

## Development

### Tech Stack

**Backend:**
- Express.js 4.21.2
- CORS 2.8.5
- UUID 9.0.1

**Frontend:**
- React 18.3.1
- React Router DOM 6.26.2
- Vite 5.4.9
- Tailwind CSS (latest)
- Formik 2.4.6
- Yup 1.4.0

## License

MIT
