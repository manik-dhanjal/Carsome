import { createContext,useEffect,useState } from "react";
import { REFERRALS_RESPONSE, USER_STATUS_RESPONSE } from "../constants/response.constans";
import { createUserDocumentFromAuth, onUserStateChangeListener, onAuthStateChangedListener, onUserReferralsStateChangedListener } from "../utils/firebase.utils";
import { useNavigate } from "react-router-dom";
import { REQUEST_PENDING, REQUEST_SUCCESS } from "../constants/transaction.constants";
import { _isNotEmpty } from "../utils/validations.utils.js"
export const UserContext = createContext({
    currentUser: REQUEST_PENDING(),
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
    const [currentUser, setCurrentUser] = useState( REQUEST_PENDING() )
    const [userReferrals, setUserReferrals] = useState([]);
    const [userStatus, setUserStatus] = useState([]);

    let navigate = useNavigate();

    const value = {currentUser, setCurrentUser};
    const refValue = {userReferrals, setUserReferrals};
    const USValue = {userStatus, setUserStatus};

    useEffect(()=>{
      const unsubscribe =  onAuthStateChangedListener( async (user)=>{
            setCurrentUser( REQUEST_SUCCESS( user||{} ) )
            if( user ){
                await createUserDocumentFromAuth(user);
            }
        })
    return unsubscribe;
    },[])
    useEffect( ()=>{
        if(_isNotEmpty( currentUser.data )){
            onUserReferralsStateChangedListener(currentUser.data.uid,(newDoc)=>{
                
                setUserReferrals((prev)=>{
                    console.log([
                        ...prev,
                        REFERRALS_RESPONSE(newDoc)
                    ])
                    return [
                        ...prev,
                        REFERRALS_RESPONSE(newDoc)
                    ]
                })
            })
            onUserStateChangeListener(currentUser.data.uid,(data)=>{
                console.log(data)
                    setUserStatus( USER_STATUS_RESPONSE(data) )
            })
            navigate("/dashboard");
        }else{
            setUserReferrals([])
            setUserStatus({})
        }
    },[currentUser.data])
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