export const users = [
  {
    id: 1,
    firstName: 'Owner',
    lastName: 'User',
    email: 'owner@example.com',
    password: 'password',
    phone: '1234567890',
    role: 'OWNER'
  },
  {
    id: 2,
    firstName: 'Staff',
    lastName: 'User',
    email: 'staff@example.com',
    password: 'password',
    phone: '0987654321',
    role: 'STAFF'
  },
  {
    id: 3,
    firstName: 'Customer',
    lastName: 'User',
    email: 'customer@example.com',
    password: 'password',
    phone: '1122334455',
    role: 'CUSTOMER'
  }
];

export const bookings = [
  {
    id: 1,
    userId: 3,
    reference: 'REF001',
    clientName: 'Customer User',
    service: 'Bridal Makeup',
    artist: 'Jane Doe',
    eventDate: '2024-12-25',
    status: 'CONFIRMED'
  },
  {
    id: 2,
    userId: 3,
    reference: 'REF002',
    clientName: 'Customer User',
    service: 'Party Makeup',
    artist: 'John Doe',
    eventDate: '2024-12-31',
    status: 'PENDING'
  }
];