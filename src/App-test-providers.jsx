import React, { useState } from 'react';
import Login from './pages/Login-test4';

function Dashboard() {
  return React.createElement('div', null, 
    React.createElement('h1', null, 'Dashboard'),
    React.createElement('p', null, 'Funciona sin providers!')
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return React.createElement('div', null, 'Cargando...');
  }

  if (!user) {
    return React.createElement(Login, {
      onLogin: (userData) => setUser(userData)
    });
  }

  return React.createElement(Dashboard);
}

export default App;
