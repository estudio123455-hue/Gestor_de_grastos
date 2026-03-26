import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login-simple';

function App() {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

export default App;
