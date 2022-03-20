import React,{useContext} from 'react'
import styled from "styled-components";
import DataCards from '../components/data-cards.components';
import Table from '../components/table.component';
import { LINK_STATS } from '../constants/table-schema.constants';
import LinkCreator from '../components/link-creator.component';
import { ReferralsContext } from '../context/user.context';
import { CLICKS_CALCULATOR, COMMISSION_RATE_CALCULATOR, CONVERSION_CALCULATOR, CONVERSION_RATE_CALCULATOR } from '../utils/formula.utils';

const Styles = styled.div`
padding-top:1rem;
&>.container{
  .data-card-cont{
    display:flex;
    flex-wrap:wrap;
    justify-content start;
    margin-bottom:1rem;
    .data-card{
      margin-right:1rem;
      margin-bottom:1rem;
    }
  }
.section-2{
  display:flex;
  align-items:start;
  margin-bottom:2rem;
  .table-cont{
    width:70%;
    margin-right:1rem;
  }
  .link-creator{
    width:30%;
    margin-left:1rem;
  }
}
}
@media screen and (max-width:1000px){
  &>.container{
    .data-card-cont{
      justify-content:start;
      margin-bottom:0;
      .data-card{
        margin-bottom:1rem;
        margin-right:1rem;
      }
    }
  }
}
@media screen and (max-width:600px){
  &>.container{
    .data-card-cont{
      margin-bottom:0;
      justify-content:space-between;
      .data-card{
        margin-bottom:1rem;
        margin-left:0;
        margin-right:0;
      }
    }
    .section-2{
      flex-direction:column-reverse;
      .table-cont{
        width:100%;
        margin-right:0rem;
      }
      .link-creator{
        width:100%;
        margin-left:0rem;
        margin-bottom:1.5rem;
      }
    }
  }
}
`;


const Dashboard = () => {
  const {userReferrals} = useContext(ReferralsContext);
  // const {userStatus} = useContext(UserStatusContext);

  return (
    <Styles>
      <div className='container'>
        <div className='data-card-cont'>
          <DataCards name={"Clicks"} value={ CLICKS_CALCULATOR(userReferrals) }/>
          <DataCards name={"Conversions"} value={ CONVERSION_CALCULATOR(userReferrals) }/>
          <DataCards name={"Conversion Rate"} value={ CONVERSION_RATE_CALCULATOR(userReferrals)+"%"}/>
          {/* <DataCards name={"Value"} value={ parseInt(userStatus.value||0) }/> */}
          <DataCards name={"Commission"} value={"RM "+COMMISSION_RATE_CALCULATOR(userReferrals)}/>
          {/* <DataCards name={"Payment Approved"} value={ parseInt(userStatus.paymentApproved||0) }/> */}
        </div>
        <div className='section-2'>
          <Table schema={LINK_STATS} data={userReferrals}/>
          <LinkCreator/>
        </div>
      </div>
    </Styles>
  )
}

export default Dashboard