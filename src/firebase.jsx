import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK419pRf5iP4rYYOy3QjYVV54AzxfBTEY",
  authDomain: "elitefit-a687a.firebaseapp.com",
  projectId: "elitefit-a687a",
  storageBucket: "elitefit-a687a.firebasestorage.app",
  messagingSenderId: "175492865161",
  appId: "1:175492865161:web:edeb4d0309550f5f1d3a58",
  measurementId: "G-FKBVLCJ14F",
  databaseURL: "https://elitefit-a687a-default-rtdb.firebaseio.com/", // Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app); // Initialize Realtime Database
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Export the app object explicitly
export { app };
