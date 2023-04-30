// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import  "firebase/compat/auth"
import  "firebase/compat/database"
import  "firebase/compat/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1XUmLQVtXiLIPx6aQEbJ0RgJ3AGpfuPU",
  authDomain: "whatsapp-1efc4.firebaseapp.com",
  projectId: "whatsapp-1efc4",
  storageBucket: "whatsapp-1efc4.appspot.com",
  messagingSenderId: "950162485074",
  appId: "1:950162485074:web:239b1016217751e9db148b"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase