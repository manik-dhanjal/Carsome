import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { BLUE,L_BLUE, BLACK, WHITE,BTN_BORDER,BTN_FILL,BTN_TRANS } from '../constants/style.contstants'



const Style = styled.div`
display:inline-block;
&>a,&>button{
    display:inline-block;
    text-decoration:none;
    padding:0.5em 1.5em;
    cursor:pointer;
    font-size:1em;
    ${({looks=BTN_FILL,color=BLUE,active=false})=>{
        switch(looks){
            case BTN_BORDER: return `
                border:1px solid ${color};
                color:${color};
                background:transparent;
                border-radius:100px;
                transition:0.3s ease;
                &:hover{
                    background:${color};
                    color:${color===WHITE?BLUE:WHITE};
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
                &:hover{
                    color:${color===L_BLUE?BLUE:L_BLUE}
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
                &:hover{
                    background:transparent;
                    color:${color};
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
const Button = ({children,to="",href="",looks,color,active,className,id,...props}) => {
    if(href||to){
        return(
            <Style looks={looks} color={color} active={active} className={"btn-cont "+className} id={id}>
                {
                    to?
                        <Link to={to} {...props} className="btn">
                            {children}
                        </Link>
                        :<a href={href} {...props} className="btn">
                            {children}
                        </a>
                }
            </Style>
        )
    }
  return (
    <Style looks={looks} color={color} active={active} className={"btn-cont "+className} id={id}>
        <button {...props} className="btn">
            {children}
        </button>
    </Style>
  )
}

export default Button