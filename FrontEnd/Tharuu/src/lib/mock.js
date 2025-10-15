export const users = [
  {
    id: 1,
    firstName: 'Tharu',
    lastName: 'Perera',
    email: 'owner@tharubridal.lk',
    password: 'password',
    phone: '+94 77 123 4567',
    role: 'OWNER'
  },
  {
    id: 2,
    firstName: 'Priya',
    lastName: 'Fernando',
    email: 'staff@tharubridal.lk',
    password: 'password',
    phone: '+94 71 234 5678',
    role: 'STAFF'
  },
  {
    id: 3,
    firstName: 'Sanduni',
    lastName: 'Jayasinghe',
    email: 'customer@tharubridal.lk',
    password: 'password',
    phone: '+94 76 345 6789',
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