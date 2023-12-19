// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/database";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCwKs-EUL8L1OaSNjs8uy_-BtAC3rhfu6I",
  authDomain: "kocoknawasena.firebaseapp.com",
  databaseURL: "https://kocoknawasena-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kocoknawasena",
  storageBucket: "kocoknawasena.appspot.com",
  messagingSenderId: "604081062531",
  appId: "1:604081062531:web:ea1cd0cc8c4fe590db91b6",
  measurementId: "G-FXV4ED197D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// console.log(app)
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
// export const { auth, database: db } = app;

export default app;

