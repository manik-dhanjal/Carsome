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
import { getFirestore, doc,getDoc,setDoc,collection,onSnapshot,query,getDocs,where, orderBy, limit } from "firebase/firestore"
// import encodeUrl from "encodeurl";
import { COMMISSION_CALCULATOR } from "./formula.utils";
import axios from "axios"


const firebaseConfig = {

    apiKey: "AIzaSyCk8YE7ALk4xMm8BOj0CCoAJLiMshMBzHo",
    authDomain: "projectambassador-prod.firebaseapp.com",
    databaseURL: "https://projectambassador-prod-default-rtdb.firebaseio.com",
    projectId: "projectambassador-prod",
    storageBucket: "projectambassador-prod.appspot.com",
    messagingSenderId: "5047764515",
    appId: "1:5047764515:web:1a7c66d2b19ecc84771396"
  
  };
  

// Initialize Firebase
const unsubscribeOnSignOut = [];
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

export const signOutUser = () =>{
     unsubscribeOnSignOut.forEach((unsubscribe)=>{
        unsubscribe();
        console.log("unsubscribe")
     })

     signOut(auth)
}

export const onAuthStateChangedListener = (callback) =>{
   return onAuthStateChanged(auth,callback)
}


// link generation methods
export const createShortenLink = async (uid,link,additionalInformation={}) => {

    const {ref1,ref2} = additionalInformation;
    const utm_content = ref1||ref2? `&utm_content=${ ( ref1? ref1 + ( ref2?",":"" ) :"" ) + (ref2? ref2 :"") }` : "";
    const encodedLink = encodeURIComponent(`${link}?utm_source=${uid}${utm_content}`);
    const {data} = await axios.post("https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCNBQMGy8X7_my2sw_MYGXfuwsZxJYa5ag",{
        longDynamicLink: `https://csnow.page.link/?link=${encodedLink}`
    })
    if(!data||!data.shortLink){
        throw new Error("Didn't get shorten link")
    }
    return data.shortLink;
}

export const onUserReferralsStateChangedListener = async (uid,callback) => {
    const q = query(collection(db, "users",uid,"referrals"));
    const campToComRef = await getDocs(collection(db, "campaign"));
    const campToCom = [];
    campToComRef.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const docData = doc.data();
        campToCom.push({
            id:doc.id,
            ...docData
        })
      });

    const unsubscribe = onSnapshot(q, (snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
            const docObject = change.doc.data()
            callback({
                id:change.doc.id,
                ...docObject,
                commission: COMMISSION_CALCULATOR(docObject,campToCom),
                createdAt:docObject.createdAt.toDate()
            })
        })
    });
    unsubscribeOnSignOut.push(unsubscribe);
}

export const fetchCommissionFromUrl = async (url) => {
    if(!url) return {};
    const findInUrl = [{
        comp:"https://www.carsome.my/buy-car/",
        key:"buy"
    },{
        comp:"https://www.carsome.my/sell-car/",
        key:"sell"
    }]
    const keyword = findInUrl.reduce((total,curr)=>{
        if(url.includes(curr.comp)&&!total) return curr.key;
        return total;
    },"")

    var data = {}
    if(keyword){
        // limit for largest
        const campToKeywordRef = query(collection(db, "campaign"), where("appliedTo", "==", keyword), orderBy("commission", "desc"), limit(1))
        const docsRef =  await getDocs(campToKeywordRef);

        docsRef.forEach((d)=>{
            data = d.data()
        })
    }
    return data;
}
export const onUserStateChangeListener = (uid,callback) => {
    
    const q = query(doc(db, "users",uid));
    const unsubscribe = onSnapshot(q, (snapshot)=>{
        callback( snapshot.data() )
    })
    unsubscribeOnSignOut.push(unsubscribe);
}

