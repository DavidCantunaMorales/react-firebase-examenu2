import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAMco4sBj_5GnpIvGYJoWGfW_ANIUxM6PE',
  authDomain: 'react-firebase-auth-52fda.firebaseapp.com',
  projectId: 'react-firebase-auth-52fda',
  storageBucket: 'react-firebase-auth-52fda.appspot.com',
  messagingSenderId: '310274999076',
  appId: '1:310274999076:web:44c02a6e8018ecbad069b1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Inicializacion de la base de datos
export const database = getFirestore(app);
