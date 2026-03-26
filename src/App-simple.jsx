import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        margin: '50px auto'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>🎉 Gestor de Gastos</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>¡Tu aplicación está funcionando!</p>
        
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '15px',
          borderRadius: '4px',
          border: '1px solid #4caf50'
        }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>✅ Estado: Funcional</h3>
          <ul style={{ color: '#333', margin: 0, paddingLeft: '20px' }}>
            <li>React cargado correctamente</li>
            <li>Estilos aplicados</li>
            <li>GitHub Pages activo</li>
            <li>Assets configurados</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <h3 style={{ color: '#856404', marginBottom: '10px' }}>🚀 Próximos Pasos:</h3>
          <ol style={{ color: '#333', margin: 0, paddingLeft: '20px' }}>
            <li>Activar login completo</li>
            <li>Conectar Firebase real</li>
            <li>Agregar más funcionalidades</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
