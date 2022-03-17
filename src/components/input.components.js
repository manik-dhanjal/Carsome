import React from 'react'
import styled from "styled-components"

const Style = styled.input`
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding:0.7em 1rem;
  outline: none;
  width:100%;
`
const Input = ({className,...props}) => {
  return (
      <Style {...props} className={className+" c-input"}/>
  )
}

export default Input