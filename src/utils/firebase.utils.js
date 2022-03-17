import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"
import { getFirestore, doc,getDoc,setDoc } from "firebase/firestore"
const firebaseConfig = {

  apiKey: "AIzaSyCNBQMGy8X7_my2sw_MYGXfuwsZxJYa5ag",
  authDomain: "carsome-c8058.firebaseapp.com",
  projectId: "carsome-c8058",
  storageBucket: "carsome-c8058.appspot.com",
  messagingSenderId: "402850768952",
  appId: "1:402850768952:web:689349da7ce12db5ba5ecd",
  measurementId: "G-HBK16W24RH"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

 provider.setCustomParameters({
     prompt:"select_account"
 })

 export const auth = getAuth();
 export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
 export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

 export const db = getFirestore();

 export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {

     const userDocRef = doc(db, 'users',  userAuth.uid);
     const userSnapshot = await getDoc(userDocRef);

     if(!userSnapshot.exists()){

         const { displayName, email } = userAuth;
         const createdAt = new Date();
         try{
             await setDoc(userDocRef,{
                 displayName,
                 email,
                 createdAt,
                 ...additionalInformation
             })
         }
         catch(error){
             console.log("error while creating document",error.message);
         }
     }
     console.log(userDocRef);
 }

 export const createAuthUserWithEmailAndPassword = async (email,password) => {
     if(!email || !password) return;

     return await createUserWithEmailAndPassword(auth,email,password);
 }
 export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
}
export const signOutUser = () => signOut(auth)

export const onAuthStateChangedListener = (callback) =>{
    onAuthStateChanged(auth,callback)
}