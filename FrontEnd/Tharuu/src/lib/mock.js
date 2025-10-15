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
    reference: 'THARU001',
    clientName: 'Sanduni Jayasinghe',
    service: 'Traditional Kandyan Bridal Package',
    artist: 'Priya Fernando',
    eventDate: '2024-12-25',
    status: 'CONFIRMED',
    address: 'No. 45/2, Temple Road, Kandy'
  },
  {
    id: 2,
    userId: 3,
    reference: 'THARU002',
    clientName: 'Sanduni Jayasinghe',
    service: 'Traditional Hindu Bridal Styling',
    artist: 'Kavitha Perera',
    eventDate: '2024-12-31',
    status: 'PENDING',
    address: 'No. 123, Galle Road, Colombo 03'
  }
];