import React from 'react'
import { useState,useContext } from 'react';
import styled from 'styled-components'
import logo from "../../assets/images/Logo.png"
import Button from '../button.components';
import { BLACK, BTN_BORDER, BTN_TRANS } from '../../constants/style.contstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons'
import Auth from '../auth.component';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase.utils';
import { PENDING, REQUEST_FAILED, REQUEST_PENDING, REQUEST_SUCCESS } from '../../constants/transaction.constants';

const Style = styled.header`
nav{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  background:white;
  z-index:1000;
}
.nav-dummy{
  height:70px;
}
nav>.container{
  display:flex;
  justify-content:space-between;
  align-items:Center;
  height:70px;
  .menu-btn{
    font-size:1.3em;
    cursor:pointer;
    display:none;
  }
  #logo{
    height:50px;
  }
  &>div{
    display:flex;
    align-items:center;
  }
  & .left-nav{
    justify-content:start;
  }
  & .right-nav{
    justify-content:end;
    & .btn-cont{
      margin-left:1rem;
    }
    #login-btn .btn:hover{
      color:${BLACK}
    }
  }
  .nav-menu{
    display:flex;
    justify-content:start;
    align-items:center;
    list-style-type:none;
    &>li{
      margin:0 10px;
      .btn{
        padding: 0 0.5em;
        font-weight:300;
      }
    }
  }
  @media screen and (max-width:900px){
    .nav-menu{
      display:none;
    }
    .right-nav .sign-btns{
      display:none;
    }
    .menu-btn{
      display:inline-block;
    }
  }
}
.menu-overlay{
  position:fixed;
  top:0;
  right:0;
  left:0;
  bottom:0;
  width:100%;
  z-index:1002;
  background:#000000bb;
}
.mobile-menu{
  position:fixed;
  top:0;
  right:0;
  z-index:1003;
  background:white;
  height:100vh;
  width:200px;
  border-right:1px solid #f1f1f1;
  padding:40px 30px;
  transition:0.3s ease;
  transform:translateX(${({isOpen})=>isOpen?"0px":"100%"});
  .cross-cont{
    display:inline-block;
    cursor:pointer;
    font-size:1.3em;
    position:absolute;
    top:15px;
    right:15px;
  }
  h4{
    margin-bottom:1rem
  }
  hr{
    margin:20px 0;
  }
  .menu,.menu-2{
    list-style-type:none;
    &>li {
      margin-bottom:0.5rem;
      .btn{
        padding:0;
        font-weight:300;
      }
    }
  }
  
}
`;

const Header = () => {
  const [isOpen,setOpen] = useState(false);
  const [isAuthOpen,setIsAuthOpen] = useState({
    state:false,
    signIn:false
  })
  const [signOutRequest,setSignOutRequest] = useState(REQUEST_SUCCESS());
  const {currentUser} = useContext(UserContext);
  const handleAuthOpenForSignIn = (res) => {
      setIsAuthOpen({
        state:true,
        signIn:res
      })
  }
  const signOutHandler = async () => {
    try{
      setSignOutRequest( REQUEST_PENDING() );
      await signOutUser();
      setSignOutRequest( REQUEST_SUCCESS() );
    }
    catch(e){
      setSignOutRequest( REQUEST_FAILED(e.message) )
      console.log(e.message)
    }
  }
  return (
    <Style isOpen={isOpen}>
        <nav>
          <div className='container'>
            <div className='left-nav'>
              <div className="img contain" id="logo">
                <img src={logo} alt="carsome logo"/>
              </div>
              {
                currentUser&&(
                  <ul className="nav-menu">
                    <li>
                      <Button to="/" looks={BTN_TRANS} color={BLACK}>Home</Button>
                    </li>
                    <li>
                      <Button to="/dashboard" looks={BTN_TRANS} color={BLACK}>Dashboard</Button>
                    </li>
                  </ul>
                )
              }

            </div>
            <div className="right-nav">
              <div className='sign-btns'>
                {
                  currentUser?
                  (
                    <Button looks={BTN_BORDER} color={BLACK} onClick={signOutHandler} isLoading={signOutRequest.status === PENDING}>Sign out</Button>  
                  ):(
                    <>
                      <Button looks={BTN_TRANS} color={BLACK} id="login-btn" onClick={()=> handleAuthOpenForSignIn(true)}>Login</Button>
                      <Button looks={BTN_BORDER} color={BLACK} id="signup-btn" onClick={()=> handleAuthOpenForSignIn(false)}>Sign up</Button>
                    </>
                  )
                }

              </div>
              <div className='menu-btn' onClick={()=>setOpen((temp)=>!temp)}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </div>
        </nav>
        {
          isOpen&&<div className='menu-overlay'></div>
        }

        <div className='mobile-menu'>

          <div className='cross-cont' onClick={()=>setOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <ul className="menu">
                  <li>
                    <Button to="/" looks={BTN_TRANS} color={BLACK}>Home</Button>
                  </li>
                  <li>
                    <Button to="/menu-1" looks={BTN_TRANS} color={BLACK}>Menu 1</Button>
                  </li>
                  <li>
                    <Button to="/menu-2" looks={BTN_TRANS} color={BLACK}>Menu 2</Button>
                  </li>
                  <li>
                    <Button to="/menu-3" looks={BTN_TRANS} color={BLACK}>Menu 3</Button>
                  </li>
          </ul>
          <hr/>
          <ul className="menu-2">
                {
                  currentUser?
                  (
                    <li>
                      <Button looks={BTN_TRANS} color={BLACK} onClick={signOutHandler} isLoading={signOutRequest.status === PENDING}>Sign out</Button>  
                    </li>
                  ):(
                    <>
                        <li>
                          <Button looks={BTN_TRANS} color={BLACK} onClick={()=> handleAuthOpenForSignIn(true)}>Login</Button>
                        </li>
                        <li>
                          <Button looks={BTN_TRANS} color={BLACK} onClick={()=> handleAuthOpenForSignIn(false)}>signup</Button>
                        </li>
                    </>
                  )
                }
                  
          </ul>
        </div>
        <Auth open={isAuthOpen.state} isSignIn={isAuthOpen.signIn} onClose={() => setIsAuthOpen(false)}/>
        <div className='nav-dummy'></div>
    </Style>
  )
}

export default Header