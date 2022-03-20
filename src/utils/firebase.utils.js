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
import { getFirestore, doc,getDoc,setDoc,collection,onSnapshot,query,getDocs } from "firebase/firestore"
import encodeUrl from "encodeurl";
import { COMMISSION_CALCULATOR } from "./formula.utils";

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

export const app = initializeApp(firebaseConfig);

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
   return onAuthStateChanged(auth,callback)
}


// link generation methods
export const createLinkDocumentForUser = async (uid,link,additionalInformation={}) => {

    const {ref1,ref2} = additionalInformation;

    // const userDocRef = doc(db, 'users',  uid);
    // const createdAt = new Date();
    // const linkDocRef = await addDoc( collection( userDocRef, "referrals" ),{
    //     link,
    //     createdAt,
    //     ...additionalInformation
    // } );
    const utm_content = ref1||ref2? `&utm_content=${ ( ref1? (encodeUrl(ref1)+(ref2?",":"")):"" ) + (ref2? encodeUrl(ref2) :"") }` : "";
    // const generatedLink = `${link}?utm_source=${encodeURIComponent(uid)}${utm_content}&utm_medium=${linkDocRef.id}`;
    const generatedLink = `${link}?utm_source=${encodeURIComponent(uid)}${utm_content}`;
    return generatedLink;
}

export const onUserReferralsStateChangedListener = async (uid,callback) => {
    const q = query(collection(db, "users",uid,"referrals"));
    const campToComRef = await getDocs(collection(db, "campaign"));
    const campToCom = [];
    campToComRef.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const docData = doc.data();

        console.log(doc.id, " => ", docData);
        campToCom.push({
            id:doc.id,
            ...docData
        })
      });

    return onSnapshot(q, (snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
            const docObject = change.doc.data()
            console.log(COMMISSION_CALCULATOR(docObject,campToCom))
            callback({
                id:change.doc.id,
                ...docObject,
                commission: COMMISSION_CALCULATOR(docObject,campToCom),
                createdAt:docObject.createdAt.toDate()
            })
        })
    });

}

export const onUserStateChangeListener = (uid,callback) => {
    const q = query(doc(db, "users",uid));
    return onSnapshot(q, (snapshot)=>{
        callback( snapshot.data() )
    })
}
