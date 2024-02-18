// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDejtSD8eMgyB4nDKnIBuL9RzfpwFkGHyk",
  authDomain: "edu-net-b8b48.firebaseapp.com",
  projectId: "edu-net-b8b48",
  storageBucket: "edu-net-b8b48.appspot.com",
  messagingSenderId: "1087148808819",
  appId: "1:1087148808819:web:868cef0bf3c58e802be806",
  measurementId: "G-QKZFE6210D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
