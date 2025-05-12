// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Replace with your actual Firebase config values from the Firebase console
  apiKey: "AIzaSyC0O9rXCuUAtcDcffBQsK9QWPKkfsA0E6o",
  authDomain: "resume-jjackson.firebaseapp.com",
  projectId: "resume-jjackson",
  storageBucket: "resume-jjackson.firebasestorage.app",
  messagingSenderId: "498416253829",
  appId: "1:498416253829:web:df6b54db875c81f77422ec",
  measurementId: "G-6LZPFG2C11"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Helper function to log custom events
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  logEvent(analytics, eventName, eventParams);
};

export { analytics };
export default app; 