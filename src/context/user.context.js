import { createContext,useEffect,useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase.utils";
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:() => null
})

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser};
    useEffect(()=>{
      const unsubscribe =  onAuthStateChangedListener((user)=>{
            setCurrentUser(user)
            if(user){
                            console.log(user.uid)
                createUserDocumentFromAuth(user);
            }
        })
    return unsubscribe;
    },[])
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}