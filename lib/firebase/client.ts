import { getApp, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export const app = initializeApp(firebaseCredentials);
const functions = getFunctions(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Check if the code is running in development or production environment
if (process.env.NODE_ENV === 'development') {
  // Connect to the Firebase Authentication emulator
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true,
  });
  // Connect to the Firebase Functions emulator
  connectFunctionsEmulator(functions, 'localhost', 5001);
  // Connect to the Firebase Storage emulator
  connectStorageEmulator(storage, 'localhost', 9199);
}
export const db = getFirestore(app);
