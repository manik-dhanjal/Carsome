import React,{useState,useContext} from 'react'
import styled from "styled-components"
import Input from './input.components'
import Button from './button.components'
import tick from "../assets/images/tick.png"
import { UserContext } from '../context/user.context'

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
const LinkCreator = () => {
    const [linkData,setLinkData] = useState(
        {
            raw:{
                link:"",
                ref1:"",
                ref2:""
            },
            gen:{
                link:"",
                isCopied:false
            }

        }
    )
    const { currentUser } = useContext(UserContext)
    const handleChange = (e) => {
        e.preventDefault();
        setLinkData((prev)=>{
            return {
                ...prev,
                raw:{
                    ...prev.raw,
                    [e.target.name]:e.target.value
                }

            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const {link,ref1,ref2} = linkData.raw;
        const trimmedLink = link.substring(0,link.indexOf("?"))
        const isLinkValid = trimmedLink.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www.\/\/)?carsome.my\//igm)
        console.log(trimmedLink)
        if(!trimmedLink || !isLinkValid){
            alert("Please enter valid link from www.carsome.my");
            return;
        }
        const generatedLink = `${trimmedLink}?utm_source=${encodeURIComponent(currentUser.uid)}&utm_content=${encodeURIComponent(ref1)}_${encodeURIComponent(ref2)}`;

        setLinkData((prev)=>{
            return {
                ...prev,
                gen:{
                    isCopied:false,
                    link:generatedLink
                }

            }
        })
    }
    const copyText = () =>{
        if(!linkData.gen.link) return;
        navigator.clipboard.writeText(linkData.gen.link);
        setLinkData((prev)=>{
            return {
                ...prev,
                gen:{
                    ...prev.gen,
                    isCopied:true,
                }

            }
        })
    }
  if(!currentUser) return;
  return (
      <Style className='link-creator' isCopied={linkData.gen.isCopied}>
          <form onSubmit={handleSubmit}>
            <Input placeholder="https://www.carsome.com/buy-car/cp02020202" onChange={handleChange} value={linkData.link} name="link" required/>
            <div className="commision-info">
                <span className='icon img contain'>
                    <img src={tick} alt="tick icon"/>
                </span>
                <span className='text'>
                    commission available - RM500 per test drive
                </span>
            </div>
            <Input placeholder="Refrence 1" onChange={handleChange} value={linkData.ref1} name="ref1" required/>
            <Input placeholder="Refrence 2" onChange={handleChange} value={linkData.ref2} name="ref2" required/>
            <Button type="submit">Create Link</Button>
          </form>
        {
            linkData.gen.link&&
            (
              <div className='copy-text' onClick={copyText} >
                <div className='text-to-copy'>
                    {linkData.gen.link}
                </div>
                <span className='indicator'>{linkData.gen.isCopied?"copied !":"copy link"}</span>
              </div>
            )
        }


      </Style>
  )
}

export default LinkCreator