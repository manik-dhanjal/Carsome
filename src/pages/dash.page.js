import React from 'react'
import styled from "styled-components";
import DataCards from '../components/data-cards.components';
import Input from '../components/input.components';
import Table from '../components/table.component';
import { LINK_STATS } from '../constants/table-schema.constants';
import LinkCreator from '../components/link-creator.component';
const Styles = styled.div`
padding-top:1rem;
&>.container{
  .data-card-cont{
    display:flex;
    flex-wrap:wrap;
    justify-content space-between;
    margin-bottom:20px;
  }
.section-2{
  display:flex;
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
      .data-card{
        margin-bottom:1rem;
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
  return (
    <Styles>
      <div className='container'>
        <div className='data-card-cont'>
          <DataCards name={"Clicks"} value={12502}/>
          <DataCards name={"Conversions"} value={42}/>
          <DataCards name={"Conversion Rate"} value={"0.3%"}/>
          <DataCards name={"Value"} value={200}/>
          <DataCards name={"Commission"} value={"RM20,298"}/>
          <DataCards name={"Payment Approved"} value={1200}/>
        </div>
        <div className='section-2'>
          <Table schema={LINK_STATS}/>
          <LinkCreator/>
        </div>
      </div>
    </Styles>
  )
}

export default Dashboard