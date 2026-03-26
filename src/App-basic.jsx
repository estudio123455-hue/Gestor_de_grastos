import React from 'react';

function App() {
  return React.createElement('div', {
    style: { 
      padding: '20px', 
      fontFamily: 'Arial',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }
  }, 
    React.createElement('h1', { style: { color: 'blue' } }, 'Hola Mundo'),
    React.createElement('p', null, 'Tu aplicación funciona en GitHub Pages!')
  );
}

export default App;
