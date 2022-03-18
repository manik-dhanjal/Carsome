import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { BLUE,L_BLUE, BLACK, WHITE, BTN_BORDER,BTN_FILL,BTN_TRANS } from '../constants/style.contstants'
import Spinner from './loading-spinner.component'


const Style = styled.div`
display:inline-block;
&>a,&>button{
    display:inline-block;
    text-decoration:none;
    padding:0.5em 1.5em;
    font-size:1em;
    position:relative;
    overflow:hidden;
    ${
        ({isLoading})=>
        !isLoading&&`
            cursor:pointer;
        `
    }
    ${({looks=BTN_FILL,color=BLUE,active=false,isLoading})=>{
        switch(looks){
            case BTN_BORDER: return `
                border:1px solid ${color};
                color:${color};
                background:transparent;
                border-radius:100px;
                transition:0.3s ease;
                ${
                   !isLoading&&`
                        &:hover{
                            background:${color};
                            color:${color===WHITE?BLUE:WHITE};
                        }
                    `
                }
                ${
                    active&&
                    `background:transparent;
                    color:${color};`
                }
            `;
            case BTN_TRANS: return`
                border:none;
                color:${color};
                background:transparent;
                transition:0.3s ease;
                ${
                    !isLoading&&`
                        &:hover{
                            color:${color===L_BLUE?BLUE:L_BLUE}
                        }
                    `
                }
                ${
                    active&&
                    `color:${color===L_BLUE?BLUE:L_BLUE}`
                }
            `
            default: return`
                border:2px solid ${color};
                color:${color===WHITE||color===L_BLUE?BLACK:WHITE};
                background:${color};
                border-radius:100px;
                transition:0.3s ease;
                ${
                    !isLoading&&`
                        &:hover{
                            background:transparent;
                            color:${color};
                        }
                    `
                }
                ${
                    active&&
                    `background:transparent;
                     color:${color};`
                }
            `
        }
    
    }}
}
`
const Button = ({children,to="",href="",looks,color,active,className,id,isLoading=false,...props}) => {
    if(href||to){
        return(
            <Style looks={looks} color={color} active={active} className={"btn-cont "+(className||null)+(isLoading?" disbaled":"enabled")} id={id} isLoading={isLoading}>
                {
                    to?
                        <Link to={to} {...props} className="btn">
                            { isLoading && <Spinner size={20}/> }
                            {children}
                        </Link>
                        :<a href={href} {...props} className="btn">
                           { isLoading && <Spinner size={20}/> }
                           {children}
                        </a>
                }
            </Style>
        )
    }
  return (
    <Style looks={looks} color={color} active={active} className={"btn-cont "+(className||null)+(isLoading?" disbaled":"enabled")} id={id} isLoading={isLoading}>
        <button {...props} className="btn" disabled={isLoading}>

            { isLoading && <Spinner size={20}/> }
            {children}
        </button>
    </Style>
  )
}

export default Button