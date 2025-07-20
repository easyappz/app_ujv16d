import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (token exists in localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function to set user and token
  const login = (userData, userToken) => {
    setCurrentUser(userData);
    setToken(userToken);
    localStorage.setItem('authToken', userToken);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  // Logout function to clear user and token
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  // Provide the auth context to children
  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
