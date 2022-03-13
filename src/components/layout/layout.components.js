import React from 'react'
import styled from "styled-components"
// import Footer from './footer.components'
import Header from './header.component'

const Styles =  styled.div`

`
const Layout = ({children}) => {
  return (
    <Styles>
        <Header/>
        {children}
        {/* <Footer/> */}
    </Styles>
  )
}

export default Layout