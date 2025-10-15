import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotificationContainer from './components/common/NotificationContainer';
import Landing from './pages/Landing/Landing.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ServiceList from './pages/Service/ServiceList.jsx';
import BookingPage from './pages/Booking/BookingPage.jsx';
import Gallery from './pages/Gallery/Gallery.jsx';
import Contact from './pages/Contact/Contact.jsx';
import OwnerDashboard from './pages/Dashboard/OwnerDashboard.jsx';
import StaffDashboard from './pages/Dashboard/StaffDashboard.jsx';
import CustomerDashboard from './pages/Dashboard/CustomerDashboard.jsx';
import Unauthorized from './pages/Unauthorized';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes */}
            <Route
              path="/bookings"
              element={
                <ProtectedRoute roles={['CUSTOMER', 'STAFF', 'OWNER']}>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            {/* Role-based dashboard routes */}
            <Route
              path="/dashboard/owner"
              element={
                <ProtectedRoute roles={['OWNER']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/staff"
              element={
                <ProtectedRoute roles={['STAFF', 'OWNER']}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/customer"
              element={
                <ProtectedRoute roles={['CUSTOMER']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>

          {/* Global Notification Container */}
          <NotificationContainer />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}
