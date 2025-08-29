import { initializeApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const isLocal = window.location.origin === 'http://localhost:5173';

const firebaseConfig = {
  apiKey: 'AIzaSyDsWBe6gRbVW49C4I4cks4OHsUxWmUYsP8',
  authDomain: 'kikoff-ch-3a583.firebaseapp.com',
  projectId: 'kikoff-ch-3a583',
  storageBucket: 'kikoff-ch-3a583.firebasestorage.app',
  messagingSenderId: '1005442096341',
  appId: '1:1005442096341:web:a6b670c36ec2afb9c1965c',
};

const app = initializeApp(firebaseConfig);

export const functions = getFunctions(app);

if (isLocal) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
