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

        if (storedToken) {
          try {
            const { getCurrentUser } = await import('../lib/api');
            const me = await getCurrentUser(storedToken);
            const normalizedUser = {
              id: me.id ?? me.user?.id ?? JSON.parse(storedUser || '{}').id,
              email: me.email ?? me.user?.email ?? JSON.parse(storedUser || '{}').email,
              name: me.name ?? me.user?.name ?? JSON.parse(storedUser || '{}').name,
              role: me.role ?? me.user?.role ?? JSON.parse(storedUser || '{}').role
            };
            setToken(storedToken);
            setUser(normalizedUser);
            localStorage.setItem('user', JSON.stringify(normalizedUser));
          } catch (_) {
            if (storedUser) {
              setToken(storedToken);
              setUser(JSON.parse(storedUser));
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
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
