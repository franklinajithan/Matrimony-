// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if browser supports it)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Authentication with Local Persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Auth persistence set to local storage"))
  .catch((error) => console.error("Error setting auth persistence:", error));

// Initialize Firestore with long polling for better compatibility
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Useful for environments like local emulators
});

// Initialize Storage
const storage = getStorage(app);

// Export Firebase services
export { app, analytics, auth, db, storage };
