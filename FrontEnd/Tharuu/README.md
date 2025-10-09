# Tharu Bridal Salon Management System

A comprehensive salon management system built with React.js frontend and Spring Boot backend, featuring role-based access control for owners, staff, and customers.

## 🚀 Features

### For Customers

- **User Registration & Authentication**: Secure account creation with email verification
- **Service Booking**: Browse services and book appointments online
- **Appointment Management**: View, reschedule, and cancel appointments
- **Service History**: Track all past services and reviews
- **Favorites**: Save preferred services and looks
- **Profile Management**: Update personal information and preferences
- **Loyalty Points**: Earn and track loyalty rewards

### For Staff

- **Schedule Management**: View daily, weekly, and monthly schedules
- **Customer Management**: Access customer information and preferences
- **Appointment Tracking**: Manage appointments and service delivery
- **Performance Metrics**: Track bookings, ratings, and customer satisfaction
- **Service Management**: View and manage assigned services
- **Profile & Settings**: Update professional information

### For Owners

- **Complete Dashboard**: Overview of business metrics and KPIs
- **Staff Management**: Add, edit, and manage staff accounts
- **Customer Management**: View all customers and their history
- **Service Catalog**: Create and manage salon services
- **Booking Management**: Oversee all appointments and bookings
- **Reports & Analytics**: Revenue tracking, popular services, staff performance
- **Business Settings**: Configure salon information and operating hours

## 🛠️ Tech Stack

### Frontend

- **React.js 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Formik & Yup** - Form management and validation
- **Context API** - Global state management

### Backend

- **Spring Boot 3.x** - Java framework
- **Spring Security** - Authentication and authorization
- **JWT (JSON Web Tokens)** - Secure token-based authentication
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- Java 17 or higher
- Maven 3.6+

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd BackEnd/spring-boot
   ```

2. **Install dependencies**

   ```bash
   mvn clean install
   ```

3. **Run the application**

   ```bash
   mvn spring-boot:run
   ```

   The backend will be available at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd FrontEnd/Tharuu
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 🔐 Authentication & Roles

### Default Accounts (for testing)

#### Owner Account

- **Email**: owner@tharusalon.com
- **Password**: owner123
- **Access**: Full system access, all management features

#### Staff Account

- **Email**: staff@tharusalon.com
- **Password**: staff123
- **Access**: Appointment management, customer service, schedule view

#### Customer Account

- **Email**: customer@tharusalon.com
- **Password**: customer123
- **Access**: Booking management, service history, profile

### Role Permissions

| Feature           | Owner | Staff        | Customer |
| ----------------- | ----- | ------------ | -------- |
| View Dashboard    | ✅    | ✅           | ✅       |
| Manage Staff      | ✅    | ❌           | ❌       |
| Manage Customers  | ✅    | ✅ (Limited) | ❌       |
| Create Services   | ✅    | ❌           | ❌       |
| Book Appointments | ✅    | ✅           | ✅       |
| View Reports      | ✅    | ❌           | ❌       |
| Manage Settings   | ✅    | ❌           | ❌       |

## 📱 Key Components

### Dashboard Components

- **OwnerDashboard**: Complete business management interface
- **StaffDashboard**: Staff-focused appointment and customer management
- **CustomerDashboard**: Customer booking and profile management

### Management Components

- **ServiceManagement**: Create and manage salon services
- **UserManagement**: Staff and customer account management
- **BookingForm**: Comprehensive appointment booking system

### Common Components

- **NotificationContainer**: Global notification system
- **ProtectedRoute**: Role-based route protection
- **ServiceCard**: Reusable service display component

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Services

- `GET /api/services` - Get all services
- `POST /api/services` - Create service (Owner only)
- `GET /api/services/{id}` - Get service by ID
- `PUT /api/services/{id}` - Update service (Owner only)

### Appointments

- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/{id}` - Update appointment
- `PATCH /api/appointments/{id}/cancel` - Cancel appointment

### Users

- `GET /api/users` - Get all users (Owner only)
- `GET /api/users/staff` - Get staff members
- `GET /api/users/customers` - Get customers
- `PUT /api/users/{id}` - Update user (Owner only)

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Interface**: Clean, professional salon-themed design
- **Interactive Components**: Smooth animations and transitions
- **Accessibility**: WCAG compliant components
- **Dark/Light Mode**: Theme switching capability
- **Toast Notifications**: Real-time feedback system

## 🚀 Deployment

### Backend Deployment

1. Build the JAR file: `mvn clean package`
2. Deploy to your preferred cloud platform (AWS, Google Cloud, Heroku)
3. Configure environment variables for production database

### Frontend Deployment

1. Build for production: `npm run build`
2. Deploy the `dist` folder to static hosting (Vercel, Netlify, AWS S3)

## 📊 Database Schema

### Core Entities

- **User**: Authentication and profile information
- **Service**: Salon services catalog
- **Appointment**: Booking and scheduling
- **Booking**: Legacy booking system (for compatibility)

### Relationships

- User (1) → (Many) Appointments (Customer)
- User (1) → (Many) Appointments (Staff)
- Service (1) → (Many) Appointments

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Role-based Access Control**: Granular permission system
- **Password Encryption**: BCrypt hashing
- **CORS Configuration**: Cross-origin request handling
- **Input Validation**: Server-side validation for all inputs

## 🧪 Testing

### Backend Testing

```bash
cd BackEnd/spring-boot
mvn test
```

### Frontend Testing

```bash
cd FrontEnd/Tharuu
npm test
```

## 📈 Future Enhancements

- [ ] Payment integration (Stripe, PayPal)
- [ ] Email notifications and reminders
- [ ] SMS notifications
- [ ] Advanced reporting and analytics
- [ ] Inventory management
- [ ] Multi-location support
- [ ] Mobile app (React Native)
- [ ] AI-powered appointment recommendations
- [ ] Customer review and rating system
- [ ] Loyalty program management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact: support@tharusalon.com

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Spring Boot team for robust backend framework
- Tailwind CSS for beautiful utility classes
- All contributors and testers

---

**Built with ❤️ for Tharu Bridal Salon**
