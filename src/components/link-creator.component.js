import React,{useState,useContext} from 'react'
import styled from "styled-components"
import Input from './input.components'
import Button from './button.components'
import tick from "../assets/images/tick.png"
import { UserContext } from '../context/user.context'
import { createLinkDocumentForUser } from '../utils/firebase.utils'
import { PENDING, REQUEST_FAILED, REQUEST_PENDING, REQUEST_SUCCESS } from '../constants/transaction.constants'

const Style = styled.div`
border:1px solid #E0E0E0;
min-width:10rem;
padding:1.5rem 1.5rem;
border-radius:1.2rem;
box-shadow: 0px 4px 4px 0px #00000040;
&>form{
    display:flex;
    justify-content:center;
    align-items:Center;
    flex-direction:column;
    .commision-info{
        width:100%;
        margin-bottom:1rem;
        display:flex;
        justify-content:start;
        align-items:Center;
        .icon{
            width:1em;
            padding-top:0.28em;
            margin-right:0.2rem;
        }
        .text{
            font-size:0.8em;
            width:100%;
        }
    }
}
.c-input{
    margin-bottom:1rem;
}
.btn-cont{
    margin:0 auto;
    margin-bottom:1rem;
}
.copy-text{
    display:flex;
    justify-content:space-between;
    align-items:Center;
    background: #F3F3F3;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 5px;
    padding:0.3rem 0.3rem;
    cursor:pointer;
    width:100%;
    .text-to-copy{
        font-size:0.8em;
        white-space:nowrap;
        overflow:hidden;
    }
    .indicator{
        white-space:nowrap;
        color:white;
        font-size:0.5em;
        background:${({isCopied})=>{
            return isCopied?"green":" #BEBEBE";
        }};
        padding:0.3em 0.5em;
        border-radius:0.1em;
        margin-left:5px;
    }
}
`
const defaultLinkForm = {
    link:"",
    ref1:"",
    ref2:"",
}
const LinkCreator = () => {
    const [ linkForm,setLinkForm ] = useState( defaultLinkForm )
    const [ linkRequest, setLinkRequest ] = useState( REQUEST_SUCCESS({isCopied:false}) );

    const { currentUser } = useContext(UserContext)

    const handleChange = (e) => {
        e.preventDefault();
        setLinkForm((prev) => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {link,ref1,ref2} = linkForm;
        const trimmedLink = link.substring(0,link.indexOf("?"))
        const isLinkValid = trimmedLink.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www.\/\/)?carsome.my(\/)?/igm)
        console.log(trimmedLink)
        if(!trimmedLink || !isLinkValid){
            alert("Please enter valid link from www.carsome.my");
            return;
        }
        try{
            setLinkRequest( REQUEST_PENDING({isCopied:false}) )
            const generatedLink = await createLinkDocumentForUser(currentUser.uid, trimmedLink, { ref1 ,ref2 });
            setLinkForm( defaultLinkForm );
            setLinkRequest( REQUEST_SUCCESS({
                link:generatedLink,
                isCopied:false,
            }) );
        }
        catch(e){
            console.log(e);
            setLinkRequest( REQUEST_FAILED(e.message,{isCopied:false}) );
            alert("Link generation failed, Please try again");
        }

    }
    const copyText = () =>{
        if(!linkRequest.data.link) return;
        navigator.clipboard.writeText(linkRequest.data.link);
        setLinkRequest((prev)=>{
            return {
                ...prev,
                data:{
                    ...prev.data,
                    isCopied:true,
                }

            }
        })
    }
  if(!currentUser) return;
  return (
      <Style className='link-creator' isCopied={linkRequest.data.isCopied}>
          <form onSubmit={handleSubmit}>
            <Input placeholder="https://www.carsome.com/buy-car/cp02020202" onChange={handleChange} value={linkForm.link} name="link" required/>
            <div className="commision-info">
                <span className='icon img contain'>
                    <img src={tick} alt="tick icon"/>
                </span>
                <span className='text'>
                    commission available - RM500 per test drive
                </span>
            </div>
            <Input placeholder="Refrence 1 (Optional)" onChange={handleChange} value={linkForm.ref1} name="ref1"/>
            <Input placeholder="Refrence 2 (Optional)" onChange={handleChange} value={linkForm.ref2} name="ref2"/>
            <Button type="submit" isLoading={linkRequest.status===PENDING}>Create Link</Button>
          </form>
        {
            linkRequest.data.link&&
            (
              <div className='copy-text' onClick={copyText} >
                <div className='text-to-copy'>
                    {linkRequest.data.link}
                </div>
                <span className='indicator'>{linkRequest.data.isCopied?"copied !":"copy link"}</span>
              </div>
            )
        }


      </Style>
  )
}

export default LinkCreator