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
  }
  &>.container>.right{
    .b-image{
      height:calc(90vh - 70px);
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
          <div className='b-image img contain'>
            <img src={bannerImg} alt="banner image"/>
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default Home