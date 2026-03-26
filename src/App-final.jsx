import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import ThemeProvider from './hooks/useTheme.jsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard-minimal';
import Loading from './pages/Loading';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Login />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExpenseProvider>
          <AppContent />
        </ExpenseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
