import React,{useState} from 'react'
import styled from "styled-components"
import { BLUE, GREY, WHITE } from '../constants/style.contstants'
import SignIn from './sign-in.component'
import SignUp from './sign-up.component'

const Style = styled.div`
.tab-cont{
    display:flex;
    justify-content:center;
    .tab{
        padding:0.6rem 1rem;
        cursor:pointer;
        width:100%;
        text-align:center;
        font-size:1.2em;
        border-radius:0.5em;
    }
    .tab.active{
        background:${BLUE};
        color:${WHITE};
    }
    margin-bottom:2rem;
}
`
const defaultData = [
    {
        name:"Sign In",
        component:<SignIn/>
    },{
        name:"Sign up",
        component:<SignUp/>
    }
]
const Tabs = ({tabsList,defaultActive=0}) => {
    const [activeTab,setActiveTab] = useState(defaultActive)
    const handleTabChange = (tabId) =>{
        setActiveTab(tabId)
    }
  return (
    <Style>
        <div className='tab-cont'>
            {
                tabsList.map((tab,idx)=>(
                    <div className={`tab ${idx==activeTab?"active":null}`} onClick={() => handleTabChange(idx)} key={idx+"tab"+tab.name}>
                        {tab.name}
                    </div>
                ))
            }
        </div>
        <div className='tab-content'>
            { tabsList[activeTab].component||null }
        </div>

    </Style>
  )
}

export default Tabs