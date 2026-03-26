import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';

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

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signup = async (email, password, name) => {
    try {
      // Simulación de registro
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        uid: 'demo-user-id',
        email,
        displayName: name,
        name
      };
      setUser(mockUser);
      return { user: mockUser };
    } catch (error) {
      throw new Error('Error al registrar usuario');
    }
  };

  const login = async (email, password) => {
    try {
      // Simulación de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        uid: 'demo-user-id',
        email,
        displayName: 'Usuario Demo',
        name: 'Usuario Demo'
      };
      setUser(mockUser);
      return { user: mockUser };
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Simulación de login con Google
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        uid: 'demo-user-id',
        email: 'demo@gmail.com',
        displayName: 'Usuario Google',
        name: 'Usuario Google'
      };
      setUser(mockUser);
      return { user: mockUser };
    } catch (error) {
      throw new Error('Error al iniciar sesión con Google');
    }
  };

  const logout = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
    } catch (error) {
      throw new Error('Error al cerrar sesión');
    }
  };

  const value = {
    user,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
