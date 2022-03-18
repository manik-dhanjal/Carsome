import React from 'react'
import styled from "styled-components"
import { YELLOW } from '../constants/style.contstants'

const Style = styled.div`
  padding:8rem 0rem;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  h1{
    font-size:8em;
    margin-bottom:0.3rem;
    color:${YELLOW}
  }
  .not-found{
    font-size:2em;
  }
`
const NotFound = () => {
  return (
    <Style>
      <h1 className='404'>
        404
      </h1>
      <div className='not-found'>
        Page Not Found :/
      </div>
    </Style>
  )
}

export default NotFound