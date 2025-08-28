// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIe_6fj54TEkMF6LbdE_MqcAbM7iJqwv4",
  authDomain: "netflix-clone-5cae8.firebaseapp.com",
  projectId: "netflix-clone-5cae8",
  storageBucket: "netflix-clone-5cae8.firebasestorage.app",
  messagingSenderId: "166507297133",
  appId: "1:166507297133:web:87a8c1149b1ab5e1b20264"
};



const app = initializeApp(firebaseConfig);
// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
  try {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    let user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user;
  } catch (error) {
    console.log("Issues in the signup", error);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.log("Login error", error);
    throw error;
  }
};

const logout = async () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
