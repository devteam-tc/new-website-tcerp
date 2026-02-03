// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";

// Single Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmC8_22Lg9ftdI9CAO5dSazUqSbZklgMk",
  authDomain: "tcerp-newversion.firebaseapp.com",
  databaseURL: "https://tcerp-newversion-default-rtdb.firebaseio.com",
  projectId: "tcerp-newversion",
  storageBucket: "tcerp-newversion.firebasestorage.app",
  messagingSenderId: "870652555892",
  appId: "1:870652555892:web:e2ec66e914da10de84d721",
  measurementId: "G-80X9888HBR"
};

// Initialize main Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize blog-specific Firebase app with a unique name
const blogApp = getApps().find(app => app.name === "blogs-app")
  ? getApp("blogs-app")
  : initializeApp(firebaseConfig, "blogs-app");

// Export main app services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const remoteConfig = getRemoteConfig(app);

// Export blog app services
export const blogDb = getFirestore(blogApp);
export const blogAuth = getAuth(blogApp);
export const blogStorage = getStorage(blogApp);

// Analytics (client-only)
let analytics = null;
export const getAnalyticsInstance = () => {
  if (typeof window === "undefined") return null;
  if (!analytics) {
    analytics = getAnalytics(app);
  }
  return analytics;
};

// Initialize analytics only on client side
if (typeof window !== "undefined") {
  isSupported().then(supported => {
    if (supported) {
      getAnalyticsInstance();
    }
  });
}

export { app, blogApp, analytics };

// Remote Config
export function getFirebaseRemoteConfig() {
  const remoteConfig = getRemoteConfig(blogApp);
  remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
  };
  remoteConfig.defaultConfig = {
    hero_variant: "A",
  };
  return remoteConfig;
}