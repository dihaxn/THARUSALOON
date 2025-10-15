import { users, bookings } from './mock';

// In-memory services store for mock API usage
let services = [
  {
    id: 1,
    name: 'Bridal Makeup',
    description: 'Full bridal makeup session with trial',
    price: 45000,
    durationMinutes: 90,
    category: 'MAKEUP',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Hair Styling',
    description: 'Event hair styling',
    price: 35000,
    durationMinutes: 60,
    category: 'HAIR',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  }
];

// Authentication API functions
export async function loginUser(credentials) {
  const user = users.find(
    (user) => user.email === credentials.email && user.password === credentials.password
  );
  if (user) {
    const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));
    return Promise.resolve({ success: true, user, token });
  } else {
    return Promise.reject(new Error('Invalid credentials'));
  }
}

export async function registerUser(userData) {
  const existingUser = users.find((user) => user.email === userData.email);
  if (existingUser) {
    return Promise.reject(new Error('Email already exists'));
  }
  const newUser = {
    id: users.length + 1,
    ...userData
  };
  users.push(newUser);
  const token = btoa(JSON.stringify({ userId: newUser.id, role: newUser.role }));
  return Promise.resolve({ success: true, user: newUser, token });
}

export async function getCurrentUser(token) {
  if (!token) return Promise.reject(new Error('No token provided'));
  try {
    const { userId } = JSON.parse(atob(token));
    const user = users.find((user) => user.id === userId);
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error('User not found'));
    }
  } catch (error) {
    return Promise.reject(new Error('Invalid token'));
  }
}

// Bookings API functions
export async function fetchBookings() {
  return Promise.resolve(bookings);
}

export async function createBooking(bookingData) {
  const newBooking = {
    id: bookings.length + 1,
    ...bookingData
  };
  bookings.push(newBooking);
  return Promise.resolve(newBooking);
}

export async function updateBooking(id, bookingData) {
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...bookingData };
    return Promise.resolve(bookings[index]);
  } else {
    return Promise.reject(new Error('Booking not found'));
  }
}

export async function deleteBooking(id) {
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    bookings.splice(index, 1);
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Booking not found'));
  }
}

// Convenience alias expected by UI
export async function createAppointment(appointmentData) {
  return createBooking(appointmentData);
}

// Users API (mocked)
const toUserView = (u) => ({
  id: u.id,
  name: [u.firstName, u.lastName].filter(Boolean).join(' ').trim() || u.email,
  email: u.email,
  role: u.role,
  enabled: true,
  createdAt: new Date().toISOString()
});

export async function getUsers() {
  return Promise.resolve(users.map(toUserView));
}

export async function getStaff() {
  return Promise.resolve(users.filter((u) => u.role === 'STAFF').map(toUserView));
}

export async function getCustomers() {
  return Promise.resolve(users.filter((u) => u.role === 'CUSTOMER').map(toUserView));
}

export async function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return Promise.reject(new Error('User not found'));
  const name = (data.name || '').trim();
  let firstName = users[index].firstName;
  let lastName = users[index].lastName;
  if (name) {
    const parts = name.split(' ');
    firstName = parts.shift() || firstName;
    lastName = parts.join(' ') || lastName;
  }
  users[index] = {
    ...users[index],
    firstName,
    lastName,
    email: data.email ?? users[index].email,
    role: data.role ?? users[index].role
  };
  return Promise.resolve(toUserView(users[index]));
}

// Services API (mocked)
export async function getServices() {
  return Promise.resolve(services);
}

export async function createService(serviceData) {
  const newService = {
    id: services.length ? Math.max(...services.map((s) => s.id)) + 1 : 1,
    name: serviceData.name,
    description: serviceData.description || '',
    price: Number(serviceData.price) || 0,
    durationMinutes: Number(serviceData.durationMinutes) || 0,
    category: serviceData.category || 'MAKEUP',
    imageUrl: serviceData.imageUrl || '',
    isActive: serviceData.isActive !== false
  };
  services.push(newService);
  return Promise.resolve(newService);
}

export async function updateService(id, serviceData) {
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return Promise.reject(new Error('Service not found'));
  services[index] = {
    ...services[index],
    ...serviceData,
    price: serviceData.price !== undefined ? Number(serviceData.price) : services[index].price,
    durationMinutes:
      serviceData.durationMinutes !== undefined
        ? Number(serviceData.durationMinutes)
        : services[index].durationMinutes
  };
  return Promise.resolve(services[index]);
}
