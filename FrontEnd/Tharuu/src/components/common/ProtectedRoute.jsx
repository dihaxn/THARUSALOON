import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRoles = null, fallbackPath = '/login' }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while authentication is being determined
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF9F9]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500"></div>
          <p className="mt-4 text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access if required roles are specified
  if (requiredRoles) {
    const hasRequiredRole = Array.isArray(requiredRoles)
      ? requiredRoles.includes(user.role)
      : user.role === requiredRoles;

    if (!hasRequiredRole) {
      // Redirect based on user role
      const roleRedirects = {
        'OWNER': '/dashboard/owner',
        'STAFF': '/dashboard/staff',
        'CUSTOMER': '/dashboard/customer'
      };

      return <Navigate to={roleRedirects[user.role] || '/home'} replace />;
    }
  }

  return children;
};

// Convenience components for specific role checks
export const OwnerRoute = ({ children }) => (
  <ProtectedRoute requiredRoles="OWNER">{children}</ProtectedRoute>
);

export const StaffRoute = ({ children }) => (
  <ProtectedRoute requiredRoles={["OWNER", "STAFF"]}>{children}</ProtectedRoute>
);

export const CustomerRoute = ({ children }) => (
  <ProtectedRoute requiredRoles="CUSTOMER">{children}</ProtectedRoute>
);

export const AuthenticatedRoute = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default ProtectedRoute;
