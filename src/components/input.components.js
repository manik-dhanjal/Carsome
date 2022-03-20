import React from 'react'
import styled from "styled-components"

const InputStyle = styled.input`
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding:0.7em 1rem;
  outline: none;
  width:100%;
`
const PrefixInput = styled.div`
display:flex;
justify-content:center;
align-items:stretch;
  input{
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    box-shadow: inset -3px 4px 4px rgba(0,0,0,0.15);
    border-radius: 0 10px 10px 0;
    padding:0.7em 1rem;
    outline: none;
    width:100%;
    padding-left:0;
  }
  .prefix-label{
    font-size:0.7em;
    display:flex;
    align-items:center;
    padding:0 0.8em;
    background:#F3F3F3;
    border-radius: 10px 0 0 10px;
    padding-right:0;
  }
`
const Input = ({className,isPrefix=false,label,...props}) => {
  if(isPrefix) return (
    <PrefixInput className={'c-input prefix-input '+className}>
        <div className='prefix-label'>
          {label}
        </div>
        <input {...props}/>
    </PrefixInput>
  )
  return (
      <InputStyle {...props} className={className+" c-input"}/>
  )
}

export default Input