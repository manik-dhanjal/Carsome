
import React from 'react'
import Layout from './components/layout/layout.components'
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/dash.page';
import Home from './pages/home.page';
import NotFound from './pages/not-found.page';
import PrivateRoute from './components/private-route.components';

const App = () => {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home/>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='*' exact={true} element={<NotFound/>} />
        </Route>
      </Routes>
  )
}

export default App
