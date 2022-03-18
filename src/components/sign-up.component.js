import React,{useState} from 'react'
import styled from "styled-components"
import Button from './button.components'
import Input from './input.components'
import { BLACK } from '../constants/style.contstants'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup} from '../utils/firebase.utils'
import { PENDING, REQUEST_FAILED, REQUEST_PENDING, REQUEST_SUCCESS } from '../constants/transaction.constants'


const Styles = styled.div`
.c-input{
    margin-bottom:1rem;
}
.btn-cont{
    width:100%;
    button{
        width:100%;
        padding-top:0.7em;
        padding-bottom:0.7em;
    }
}
.or-div{
    margin:10px;
}
`
const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUp = ({closeNow}) => {
  const [formFields,setFormFields] = useState(defaultFormFields);
  const {displayName,email,password,confirmPassword} = formFields;
  const [googleAuthRequest, setGoogleAuthRequest] = useState( REQUEST_SUCCESS() );
  const [CredAuthRequest, setCredAuthRequest] = useState( REQUEST_SUCCESS() );

  const resetFormFields = () => {
      setFormFields(defaultFormFields);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password!==confirmPassword){
        alert("password do not match");
        return;
    }
    try{
        setCredAuthRequest( REQUEST_PENDING() );
        const {user} = await createAuthUserWithEmailAndPassword(email,password);
        await createUserDocumentFromAuth(user,{displayName});
        resetFormFields();
        closeNow();
        setCredAuthRequest( REQUEST_SUCCESS() );
    }catch(error){
        const errorCodeMsg = {
            'auth/weak-password':"Password should be at least 6 characters.",
            'auth/email-already-in-use':"Cannot create user, email already exist.",
        }
        setCredAuthRequest( REQUEST_FAILED(errorCodeMsg[error.code]||"error faced while signing in"));
        alert(errorCodeMsg[error.code]||"error faced while signing up");
        console.log('user creation encountered error',error.message);
    }
  }
  const handleChange = (event) => {
    const {name,value} = event.target;
    
    setFormFields((prev)=>{
        return {
            ...prev,
            [name]:value
        }
    })
  }
  const logGoogleUser = async () => {
    try{
        setGoogleAuthRequest( REQUEST_PENDING() );
        await signInWithGooglePopup();
        setGoogleAuthRequest( REQUEST_SUCCESS() );
        closeNow();
      }
      catch(e){
        setGoogleAuthRequest( REQUEST_FAILED(e.message) );
      }
}
  return (
    <Styles>
        <form onSubmit = {handleSubmit}>
            <Input value={displayName} type="text" name="displayName" placeholder="Name" required onChange={handleChange}/>
            <Input value={email} type="email" name="email" placeholder="E mail" required onChange={handleChange}/>
            <Input value={password} type="password" name="password" placeholder="Password" required onChange={handleChange}/>
            <Input value={confirmPassword} type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange}/>
            <Button type="submit" color={BLACK} isLoading={ CredAuthRequest.status === PENDING }>Sign up</Button>
        </form>
        <div style={{textAlign:"center"}} className="or-div">or</div>
        <Button onClick={logGoogleUser} isLoading={ googleAuthRequest.status === PENDING }>Sign up with Google</Button>
    </Styles>
  )
}

export default SignUp