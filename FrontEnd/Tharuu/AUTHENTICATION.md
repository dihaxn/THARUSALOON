# Authentication System

This document describes the authentication and authorization system implemented in the Tharu Salon application.

## Features

- **Role-based Authentication**: Three user roles - Owner, Staff, and Customer
- **JWT Token Authentication**: Secure token-based authentication
- **Protected Routes**: Role-based access control for different pages
- **Consistent UI**: Matching design for login and registration pages
- **Fallback System**: Mock authentication when backend is unavailable

## User Roles

### Owner

- Full access to all salon management features
- Dashboard: `/dashboard/owner`
- Access to: All bookings, staff management, reports, settings

### Staff

- Access to customer service and booking management
- Dashboard: `/dashboard/staff`
- Access to: Customer appointments, service management

### Customer

- Access to personal booking and service information
- Dashboard: `/dashboard/customer`
- Access to: Personal appointments, service booking, gallery

## Authentication Flow

1. **Registration**: Only customers can create accounts (staff and owner accounts are pre-created)
2. **Login**: Users enter credentials only (role automatically determined from account)
3. **Token Generation**: JWT token created upon successful authentication
4. **Route Protection**: Protected routes check user authentication and role
5. **Automatic Redirect**: Users redirected to appropriate dashboard based on their stored role

## Account Access

### Pre-created Accounts (Staff & Owner)

These accounts are created by administration and credentials are provided directly:

**Owner**

- Email: `owner@tharusalon.com`
- Password: `password123`

**Staff**

- Email: `staff@tharusalon.com`
- Password: `password123`

### Customer Registration

Customers can create their own accounts through the registration form. All new registrations are automatically assigned the "Customer" role.

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

### Protected Routes

- `GET /api/bookings` - Accessible by all authenticated users

## Implementation Details

### Frontend

- **AuthContext**: Centralized authentication state management
- **ProtectedRoute**: Component for route protection
- **Role-based Components**: Separate dashboards for each role
- **Consistent Design**: Matching login/register page layouts
- **Simplified Login**: No role selection needed (role determined from user account)

### Backend

- **Spring Security**: Security framework
- **JWT Tokens**: Token-based authentication
- **User Entity**: Database model with role support
- **Password Encryption**: BCrypt password hashing

## Usage

1. Start the backend server
2. Start the frontend development server
3. Navigate to `/login` or `/register`
4. Use the appropriate credentials for your role
5. Access role-specific features through the dashboard

## Security Features

- Password encryption using BCrypt
- JWT token expiration (24 hours)
- CORS configuration for frontend-backend communication
- Role-based authorization on protected endpoints
- Secure token storage in localStorage
