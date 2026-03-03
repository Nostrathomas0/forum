// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_bq5-hmAlNbK-2ZgHSFl0Iew4uphF_Eo",
  authDomain: "languapps.firebaseapp.com",
  databaseURL: "https://languapps-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "languapps",
  storageBucket: "languapps.firebasestorage.app",
  messagingSenderId: "866735367707",
  appId: "1:866735367707:web:6154b4ab63fcab0272fabe",
  measurementId: "G-MCZY61SSMM"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);