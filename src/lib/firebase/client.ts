import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const firebaseCredentials = {
  apiKey: import.meta.env.VITE_FIREBASE_PUBLIC_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

export const app = initializeApp(firebaseCredentials);
const functions = getFunctions(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Check if the code is running in development or production environment
if (import.meta.env.VITE_APP_ENV === 'development') {
  // Connect to the Firebase Authentication emulator
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true,
  });
  // Connect to the Firebase Functions emulator
  connectFunctionsEmulator(functions, 'localhost', 5001);
  // Connect to the Firebase Firestore emulator
  connectFirestoreEmulator(db, 'localhost', 8080);
}
