import React,{ useContext } from 'react'
import { Navigate} from 'react-router-dom';
import { PENDING, SUCCESS } from '../constants/transaction.constants';
import { UserContext } from '../context/user.context';
import { CurrencyContext } from '../context/currency.context';
import { _isNotEmpty } from '../utils/validations.utils';
import Spinner from './loading-spinner.component';

const PrivateRoute = ({ children, not = false }) => {
  const { currentUser }= useContext(UserContext);
  const { currentCurrency }= useContext(CurrencyContext);
  if ( currentUser.status === PENDING || currentCurrency.status===PENDING){
    return (
      <>
        <Spinner size={50}/>                                                              
      </>
    )
  }
  if ( !_isNotEmpty( currentUser.data ) && currentUser.status === SUCCESS && !not) {
    return <Navigate to="/" />;
  }


  return children;
}

export default PrivateRoute