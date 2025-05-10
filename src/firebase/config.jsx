import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDhHD-cVQY2k4_BgbPuRU5hjGskUAI6paY",
  authDomain: "lifedev-1932.firebaseapp.com",
  projectId: "lifedev-1932",
  storageBucket: "lifedev-1932.firebasestorage.app",
  messagingSenderId: "788682763182",
  appId: "1:788682763182:web:f71eec46396a1d031fb63f",
  measurementId: "G-LRMYWB3D2R"
};

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }