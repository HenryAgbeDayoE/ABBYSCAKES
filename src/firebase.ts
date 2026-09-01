// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD51abLNlNn49BVpz-j3ERw7yMlvLWTIiU",
  authDomain: "cakewebsite-project.firebaseapp.com",
  projectId: "cakewebsite-project",
  storageBucket: "cakewebsite-project.firebasestorage.app",
  messagingSenderId: "287953039575",
  appId: "1:287953039575:web:1ad99986e8d5a890684092",
  measurementId: "G-5909ZD4HTQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };

