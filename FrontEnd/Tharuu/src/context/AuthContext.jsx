import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // User roles
  const ROLES = {
    OWNER: 'OWNER',
    STAFF: 'STAFF',
    CUSTOMER: 'CUSTOMER'
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Try to use real API first, fallback to mock if backend is not available
      try {
        const { loginUser } = await import('../lib/api');
        const response = await loginUser({
          email: credentials.email,
          password: credentials.password
        });
        
        const user = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role
        };
        
        setUser(user);
        setToken(response.token);
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true, user, token: response.token };
      } catch (apiError) {
        console.warn('API not available, using mock authentication:', apiError);
        
        // Fallback to mock authentication - automatically determine role from email
        const mockUsers = {
          'owner@tharusalon.com': { id: 1, email: 'owner@tharusalon.com', role: ROLES.OWNER, name: 'Salon Owner' },
          'staff@tharusalon.com': { id: 2, email: 'staff@tharusalon.com', role: ROLES.STAFF, name: 'Salon Staff' },
          'customer@example.com': { id: 3, email: 'customer@example.com', role: ROLES.CUSTOMER, name: 'Customer User' }
        };

        const user = mockUsers[credentials.email];
        
        if (user && credentials.password === 'password123') {
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          setUser(user);
          setToken(mockToken);
          
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(user));
          
          return { success: true, user, token: mockToken };
        } else {
          throw new Error('Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Try to use real API first, fallback to mock if backend is not available
      try {
        const { registerUser } = await import('../lib/api');
        const response = await registerUser({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role
        });
        
        const user = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role
        };
        
        setUser(user);
        setToken(response.token);
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true, user, token: response.token };
      } catch (apiError) {
        console.warn('API not available, using mock registration:', apiError);
        
        // Fallback to mock registration
        const newUser = {
          id: Date.now(),
          email: userData.email,
          role: userData.role || ROLES.CUSTOMER,
          name: userData.name || userData.email.split('@')[0]
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        setUser(newUser);
        setToken(mockToken);
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        return { success: true, user: newUser, token: mockToken };
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const hasRole = (requiredRoles) => {
    if (!user) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    return user.role === requiredRoles;
  };

  const isOwner = () => hasRole(ROLES.OWNER);
  const isStaff = () => hasRole([ROLES.OWNER, ROLES.STAFF]);
  const isCustomer = () => hasRole(ROLES.CUSTOMER);

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    hasRole,
    isOwner,
    isStaff,
    isCustomer,
    ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
