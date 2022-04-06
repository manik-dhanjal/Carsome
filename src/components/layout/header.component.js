import React from 'react'
import { useState,useContext } from 'react';
import styled from 'styled-components'
import logo from "../../assets/images/Logo.png"
import logoDark from "../../assets/images/logo-dark.svg"
import Button from '../button.components';
import { BLACK, BLUE, BTN_BORDER, BTN_TRANS } from '../../constants/style.contstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../context/user.context';
import { signOutUser,signInWithGooglePopup } from '../../utils/firebase.utils';
import { PENDING, REQUEST_FAILED, REQUEST_PENDING, REQUEST_SUCCESS } from '../../constants/transaction.constants';
import { _isNotEmpty } from '../../utils/validations.utils';

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
    height:20px;
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
  }
  .nav-menu{
    display:flex;
    justify-content:start;
    align-items:center;
    list-style-type:none;
    &>li{
      margin:0 10px;
      &>.btn-cont{
        display:flex;
        justify-content:center;
        align-items:center;
      }
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
  width:220px;
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
        font-weight:300;
      }
    }
  }
  .menu{
    .btn{
      padding:0;
    }
  }
  
}
`;

const Header = () => {
  const [isOpen,setOpen] = useState(false);
  const {currentUser,setCurrentUser} = useContext(UserContext);

  const signOutHandler = async () => {
    try{
      setCurrentUser( REQUEST_PENDING() );
      await signOutUser();
      setCurrentUser( REQUEST_SUCCESS() );
    }
    catch(e){
      setCurrentUser( REQUEST_FAILED(e.message) )
      console.log(e.message)
    }
  }
  const logGoogleUser = async () => {
    try{
      setCurrentUser( REQUEST_PENDING() );
      await signInWithGooglePopup();
      setOpen(false)
    }
    catch(e){
      setCurrentUser( REQUEST_FAILED(e.message) );
    }
}
  return (
    <Style isOpen={isOpen}>
        <nav>
          <div className='container'>
            <div className='left-nav'>
              <div className="img contain" id="logo">
                <img src={logoDark} alt="carsome logo"/>
              </div>
              {
                (_isNotEmpty( currentUser.data ))&&(
                  <ul className="nav-menu">
                    {/* <li>
                      <Button to="/" looks={BTN_TRANS} color={BLACK}>Home</Button>
                    </li> */}
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
                  (_isNotEmpty( currentUser.data ))?
                  (
                    <Button looks={BTN_BORDER} color={BLACK} onClick={signOutHandler} isLoading={currentUser.status === PENDING} >Sign out</Button>  
                  ):(
                    <>
                      <Button color={BLUE} id="login-btn" onClick={()=> logGoogleUser()} isLoading={currentUser.status === PENDING}>Login with Google</Button>
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
            {
                (_isNotEmpty( currentUser.data ))&&(
                  <>
                    <ul className="menu">
                      {/* <li>
                        <Button to="/" looks={BTN_TRANS} color={BLACK} onClick={()=>setOpen(false)}>Home</Button>
                      </li> */}
                      <li>
                        <Button to="/dashboard" looks={BTN_TRANS} color={BLACK} onClick={()=>setOpen(false)}>Dashboard</Button>
                      </li>
                    </ul>
                    <hr/>
                  </>
                )
            }


          <ul className="menu-2">
                {
                  (_isNotEmpty( currentUser.data ))?
                  (
                    <li>
                      <Button looks={BTN_BORDER} color={BLACK} onClick={signOutHandler} isLoading={currentUser.status === PENDING} >Sign out</Button>  
                    </li>
                  ):(
                    <li>
                      <Button color={BLUE} id="login-btn" onClick={()=> logGoogleUser()} isLoading={currentUser.status === PENDING}>Login with Google</Button>
                    </li>
                  )
                }
                  
          </ul>
        </div>
        <div className='nav-dummy'></div>
    </Style>
  )
}

export default Header