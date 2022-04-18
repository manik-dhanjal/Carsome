import React,{useEffect, useState} from 'react'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { BLACK, YELLOW } from '../constants/style.contstants'

const Style = styled.div`
position:relative;
input{
    display:none;
}
.drop-head{
    background:white;
    border:1px solid ${BLACK};
    border-radius:100px;
    padding:0.5em 3em;
    padding-left:1.5em;
    width:100%;
    cursor:pointer;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:1em;
    position:relative;
    .fa-caret-down{
        position:absolute;
        right:1.5em;
        transform:translateX(50%);
    }
    ${
        ({isDisabled})=> isDisabled?`
            color:#e2e2e2;
            border:1px solid #e2e2e2;
            .fa-caret-down{
                color:#e2e2e2;
            }
            cursor:auto;
        `:""
    }
}

.drop-list-cont{
    position:absolute;
    top: 100% ;
    left:0;
    background:white;
    transition:height 0.3s ease;
    min-width:100%;
    height:0px;
    visibility:hidden;
    overflow:hidden;
    border:1px solid #e5e5e5;
    border-radius:5px;
    ul{
        list-style-type: none;
        padding:10px 0px;
        max-height:250px;
        overflow-y:auto;
        li{
            padding:5px 10px;
            cursor:pointer;
            transition:background 0.2s ease;
            font-size:0.9em;
            &:hover{
                background:${YELLOW+50};
            }
        }
    }
}
&:hover{
    ${
        ({isDisabled})=>isDisabled?"":`
        .drop-list-cont{
            visibility:visible;
            height:auto;
        }
        `
    }
}
`
const Dropdown = ({name, options=[],handleSelect,placeholder="dropdown",isDisabled=false,defaultValue}) => {
  const [currentOption,setCurrentOption] = useState({});
  const [isOpen,setIsOpen] = useState(false);

  useEffect(()=>{
    if(!defaultValue) return;
    const defaultOption = options.find((option)=> option.value===defaultValue)
    setCurrentOption( {...defaultOption} );
  },[defaultValue])

  const handleOptionSelect = async (option) =>{
    const temp = currentOption;
    setCurrentOption( {...option} )
    setIsOpen( false );
    const response = await handleSelect( {...option} )
    if(!response){
        setCurrentOption( temp )
    } 

  }

  return (
    <Style isOpen={isOpen} isDisabled={isDisabled}>
        <input name={name} value={currentOption.value||""} className="input" readOnly/>
        <div className='drop-head' onClick={() => setIsOpen(!isOpen)}>
            {currentOption.label||placeholder}
            <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {
            // isOpen&&(
                <div className='drop-list-cont'>
                    <ul className='drop-list'>
                        {
                            options.map((option,idx)=>(
                                <li key={idx+"drop-options-"+name} data-value={option.value} onClick={() => handleOptionSelect(option)}>
                                    {option.label}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            // )
        }
        
    </Style>
  )
}

export default Dropdown