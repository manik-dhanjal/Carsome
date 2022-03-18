import React,{ useContext } from 'react'
import { Navigate} from 'react-router-dom';
import { UserContext } from '../context/user.context';

const PrivateRoute = ({ children }) => {
  const { currentUser }= useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute