import React from 'react'
import styled from 'styled-components'
import logo from "../../assets/images/Logo.png"
import Button from '../button.components';
import { BLACK, BTN_BORDER, BTN_TRANS } from '../../constants/style.contstants'

const Style = styled.header`
nav{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  background:white;
}
.nav-dummy{
  height:70px;
}
nav>.container{
  display:flex;
  justify-content:space-between;
  align-items:Center;
  height:70px;
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
    &>.btn-cont{
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
}
`;

const Header = () => {
  return (
    <Style>
        <nav>
          <div className='container'>
            <div className='left-nav'>
              <div className="img contain" id="logo">
                <img src={logo} alt="carsome logo"/>
              </div>
              <ul className="nav-menu">
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
            </div>
            <div className="right-nav">
              <Button looks={BTN_TRANS} color={BLACK} id="login-btn">Login</Button>
              <Button looks={BTN_BORDER} color={BLACK} id="signup-btn">Sign up</Button>
            </div>
          </div>
        </nav>
        <div className='nav-dummy'></div>
    </Style>
  )
}

export default Header