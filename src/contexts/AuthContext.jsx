
    import React, { createContext, useState, useEffect } from 'react';

    export const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      }, []);

      const login = (userData) => {
        localStorage.setItem('authUser', JSON.stringify(userData));
        setUser(userData);
      };

      const logout = () => {
        localStorage.removeItem('authUser');
        setUser(null);
      };

      const register = (userData) => {
        // In a real app, this would involve an API call.
        // For now, we'll simulate it and then log in.
        const newUser = { ...userData, id: Date.now().toString() };
        login(newUser);
        return newUser;
      };

      return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
          {children}
        </AuthContext.Provider>
      );
    };
  