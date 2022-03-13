
import React from 'react'
import Layout from './components/layout/layout.components'
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/dash.page';
import Home from './pages/home.page';
import NotFound from './pages/not-found.page';

const App = () => {
  return (
   <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={NotFound} />
        </Routes>
   </Layout>
  )
}

export default App
