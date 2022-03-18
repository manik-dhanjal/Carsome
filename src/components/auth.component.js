import React from 'react'
import ReactDom from 'react-dom'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import SignUp from './sign-up.component'
import SignIn from './sign-in.component'
import Tabs from './tabs.component'

const Style = styled.div`
    .modal{
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background:white;
        padding:1.5rem;
        border-radius:0.5rem;
        z-index:1005;
        max-width:400px;
        .close-btn{
            position:absolute;
            top:1rem;
            right:1rem;
            cursor:pointer;
            padding:0.2em;
            font-size:1.2em;
            transform:translate(50%,-50%);
        }
    }
    .overlay{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background: rgba(0, 0, 0, 0.7);
        z-index:1004;
    }
`
const Auth = ({open,isSignIn,onClose}) => {
    if (!open) return null;
  return ReactDom.createPortal(
    <Style>
        <div className='overlay'></div>
        <div className='modal'>
            <button onClick={onClose}><FontAwesomeIcon icon={faXmark} className="close-btn"/></button>
            
            <Tabs tabsList={[
                {
                    name:"Log in",
                    component:<SignIn closeNow={onClose}/>
                },{
                    name:"Sign up",
                    component:<SignUp closeNow={onClose}/>
                }
            ]} defaultActive={isSignIn?0:1}/>
           
        </div>
    </Style>,
    document.getElementById('portal')
  )
}

export default Auth