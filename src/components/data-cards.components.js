import React from 'react'
import styled from "styled-components";

const Style = styled.div`
border:1px solid #E0E0E0;
display:inline-block;
min-width:10rem;
padding:0.8rem 2rem;
border-radius:1.2rem;
box-shadow: 0px 4px 4px 0px #00000040;
background:white;
.data-name{
  font-size:0.9em;
  font-weight:200;
  margin-bottom:0.2rem;
}
.data-value{
  font-size:1.5em;
  font-weight:500;
}
`

const DataCards = ({name,value}) => {
  return (
    <Style className='data-card'>
        <div className='data-name'>
            {name}
        </div>
        <div className='data-value'>
            {value}
        </div>
    </Style>
  )
}

export default DataCards