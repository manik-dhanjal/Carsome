import React from 'react'
import styled from "styled-components"
import { BLACK, BLUE, L_BLUE } from '../constants/style.contstants'

const Styles = styled.div`
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
display:flex;
justify-content:center;
align-items:center;
background:${({isDark})=> isDark?"rgba(0, 0, 0, 0.3)":"rgba(255, 255, 255, 0.2)"};
.loading-spinner{
    border: ${({size})=>size/10}px solid #EAF0F6;
    border-radius: 50%;
    border-top: ${({size})=>size/10}px solid ${({isDark})=> isDark?L_BLUE:BLUE};
    width: ${({size})=>size}px;
    height: ${({size})=>size}px;
    animation: spinner 2s linear infinite;
}
@keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }  
}
`
const Spinner = ({size,isDark=false}) => {
  return (
    <Styles size={size} isDark={isDark}>
        <div className='loading-spinner'></div>
    </Styles>
  )
}

export default Spinner