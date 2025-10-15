import { users, bookings } from './mock';

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
