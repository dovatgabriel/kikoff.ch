import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/web-extension';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyAazRgwDchX_FykvC6BesA9pz_OxqgdSS0',
  authDomain: 'kikoff-ch-14e6b.firebaseapp.com',
  projectId: 'kikoff-ch-14e6b',
  storageBucket: 'kikoff-ch-14e6b.firebasestorage.app',
  messagingSenderId: '141933611430',
  appId: '1:141933611430:web:ffa7ffae50a63afd74a767',
};

const app = initializeApp(firebaseConfig);

export const functions = getFunctions(app, 'us-central1');
export const auth = getAuth(app);

if (window.location.host === 'localhost:5173') {
  console.log('connecting emulators');
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
