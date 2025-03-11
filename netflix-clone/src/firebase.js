// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBCqrk2axkx_mQsMvg7VvloYrKfpQPoeCs",
  authDomain: "netflix-clone-c854b.firebaseapp.com",
  projectId: "netflix-clone-c854b",
  storageBucket: "netflix-clone-c854b.firebasestorage.app",
  messagingSenderId: "1071895064396",
  appId: "1:1071895064396:web:8154bfe79e24ab30c469e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password)=>{
     try {
        const res= await createUserWithEmailAndPassword(auth,email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
             uid: user.uid,
             name,
             authProvider: "local",
             email,
        }); 
    } catch (error) {
         console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));
         
     }
}

const login = async(email, password)=>{
     try {
        await signInWithEmailAndPassword(auth, email, password)
     } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

     }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};