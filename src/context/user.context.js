import { createContext,useEffect,useState } from "react";
import { REFERRALS_RESPONSE, USER_STATUS_RESPONSE } from "../constants/response.constans";
import { createUserDocumentFromAuth, onUserStateChangeListener, onAuthStateChangedListener, onUserReferralsStateChangedListener } from "../utils/firebase.utils";

export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:() => null
})
export const ReferralsContext = createContext({
    userReferrals:[],
    setUserReferrals:() => null
})
export const UserStatusContext = createContext({
    userStatus:null,
    setUserStatus:() => null
})
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userReferrals, setUserReferrals] = useState([]);
    const [userStatus, setUserStatus] = useState([]);
    
    const value = {currentUser, setCurrentUser};
    const refValue = {userReferrals, setUserReferrals};
    const USValue = {userStatus, setUserStatus};

    useEffect(()=>{
      const unsubscribe =  onAuthStateChangedListener((user)=>{
            setCurrentUser(user)
            if(user){
                createUserDocumentFromAuth(user);
            }
        })
    return unsubscribe;
    },[])
    useEffect( ()=>{
        const unsubscribeRef = currentUser? 
            onUserReferralsStateChangedListener(currentUser.uid,(newDoc)=>{
                    setUserReferrals((prev)=>{
                        return [
                            ...prev,
                            REFERRALS_RESPONSE(newDoc)
                        ]
                    })
            }) : () =>{};
        const unsubscribeStat = currentUser?
            onUserStateChangeListener(currentUser.uid,(data)=>{
                setUserStatus( USER_STATUS_RESPONSE(data) )
            }) : () => {};
        if(!currentUser){
            setUserReferrals([])
            setUserStatus({})
        }
        return () => {
            unsubscribeRef();
            unsubscribeStat();
        }
    },[currentUser])
    return (
        <UserContext.Provider value={value}>
            <ReferralsContext.Provider value={refValue}>
                <UserStatusContext.Provider value={USValue}>
                    {children}
                </UserStatusContext.Provider>
            </ReferralsContext.Provider>
        </UserContext.Provider>
    )
}