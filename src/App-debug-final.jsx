import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import ThemeProvider from './hooks/useTheme.jsx';
import Login from './pages/Login';

function Dashboard() {
  return React.createElement('div', null, 
    React.createElement('h1', null, 'Dashboard'),
    React.createElement('p', null, 'Funciona!')
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return React.createElement('div', null, 'Cargando...');
  }

  if (!user) {
    return React.createElement(Login);
  }

  return React.createElement(Dashboard);
}

function App() {
  return React.createElement(
    ThemeProvider,
    null,
    React.createElement(
      AuthProvider,
      null,
      React.createElement(
        ExpenseProvider,
        null,
        React.createElement(AppContent)
      )
    )
  );
}

export default App;
