// Configuración de Firebase para desarrollo
// Para producción, reemplaza estos valores con tus credenciales reales
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "demo-key-for-development",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo"
};

// Intentar inicializar Firebase, pero si falla usar modo demo
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization failed, using demo mode:', error.message);
  
  // Crear objetos mock para demo
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      setTimeout(() => callback(null), 100);
      return () => {};
    }
  };
  
  db = {
    collection: () => ({
      add: () => Promise.resolve({ id: 'demo-id' }),
      where: () => ({
        orderBy: () => ({
          onSnapshot: (callback) => {
            callback({ docs: [] });
            return () => {};
          }
        })
      })
    })
  };
}

export { auth, db };
export default app;
