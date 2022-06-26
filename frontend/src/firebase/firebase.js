// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAca-SO15B7WNhteyFR8tTdSdbUqd-NC4",
  authDomain: "monday-api-app.firebaseapp.com",
  projectId: "monday-api-app",
  storageBucket: "monday-api-app.appspot.com",
  messagingSenderId: "468898669698",
  appId: "1:468898669698:web:ae593c6d1ac19c4277409b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;