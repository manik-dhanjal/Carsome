import React from 'react'
import styled from "styled-components"
// import Footer from './footer.components'
import { Outlet } from 'react-router-dom'
import Header from './header.component'

const Styles =  styled.div`

`
const Layout = ({children}) => {
  return (
    <Styles>
        <Header/>
        <Outlet/>
        {/* <Footer/> */}
    </Styles>
  )
}

export default Layout