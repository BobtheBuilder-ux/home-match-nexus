
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBc2Ujf2VGO9KOy7F6bvHTbUB8wwOQThms",
  authDomain: "homematch-12.firebaseapp.com",
  projectId: "homematch-12",
  storageBucket: "homematch-12.firebasestorage.app",
  messagingSenderId: "1086949881265",
  appId: "1:1086949881265:web:d73173c39c5e433895b990",
  measurementId: "G-4TKH1FQ4MY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
