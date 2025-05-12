// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import firebaseConfig from './config/firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Helper function to log custom events
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  logEvent(analytics, eventName, eventParams);
};

export { analytics };
export default app; 