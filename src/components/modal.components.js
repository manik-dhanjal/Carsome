import React from 'react'
import ReactDom from 'react-dom'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Style = styled.div`
    .modal{
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background:white;
        padding:1.5rem;
        border-radius:1rem;
        z-index:1005;
    }
    .overlay{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        backgroundColor: rgba(0, 0, 0, 0.7);
        z-index:1004;
    }
`
const Modal = ({open,children,onClose}) => {
    if (!open) return null;
  return ReactDom.createPortal(
    <Style>
        <div className='overlay'></div>
        <div className='modal'>
            <button onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
            {children}
        </div>
    </Style>,
    document.getElementById('portal')
  )
}

export default Modal