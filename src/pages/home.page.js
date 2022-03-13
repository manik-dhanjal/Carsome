import React from 'react'
import styled from "styled-components"
import Button from '../components/button.components'
import { BLUE, BTN_FILL, L_BLACK } from '../constants/style.contstants'
import bannerImg from "../assets/images/banner_img.png"
const Styles = styled.div`
  &>.container{
    display:flex;
    justify-content:space-between;
    align-items:Center;
    height:calc( 100vh - 70px );
    position:relative;
    overflow:hidden;
  }
  &>.container>.left{
    h1{
      color:${BLUE};
      margin-bottom:1.2rem
    }
    .sub-title{
      color:${L_BLACK};
      margin-bottom:1.4rem;
      font-size:1.1em;
    }
    z-index:2;
  }
  &>.container>.right{
    max-width:50%;
    .b-image{
      height:calc(90vh - 70px);
      img{
        object-fit:contain;
      }
    }
  }
  @media screen and (max-width:600px){
    &>.container{
      justify-content:center;
      align-items:center;
    }
    &>.container>.left{
      display:flex;
      flex-direction:column;
      align-items:center;
      text-align:Center;
      h1{
        font-size:2.5em;
      }
      .btn{
        font-size:18px;
      }
    }
    &>.container>.right{
      max-width:100%;
      .overlay{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:1;
        background:#ffffff95;
      }
      .b-image{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:0;
        img{
          object-position:right center;
          object-fit:cover;
        }
      }
    }

  }
`
const Home = () => {
  return (
    <Styles>
      <div className='container'>
        <div className='left'>
            <h1 className='title'>
            Grow with <br/>Ambassador Program
            </h1>
            <p className='sub-title'>
              Earn Commission for Every Successful Referral
            </p>
            <Button color={BLUE} looks={BTN_FILL}>Get Started</Button>
        </div>
        <div className='right'>
          <div className='overlay'></div>
          <div className='b-image img contain'>
            <img src={bannerImg} alt="banner image"/>
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default Home