import React from 'react'
import styled from "styled-components";
import DataCards from '../components/data-cards.components';
import Input from '../components/input.components';
import Table from '../components/table.component';
import { LINK_STATS } from '../constants/table-schema.constants';
import LinkCreator from '../components/link-creator.component';
const Styles = styled.div`
&>.container{
  .data-card-cont{
    margin-bottom:20px;
  }
.section-2{
  display:flex;
  .table{
    width:70%;
    margin-right:1rem;
  }
  .link-creator{
    width:30%;
    margin-left:1rem;
  }
}
}
`;


const Dashboard = () => {
  return (
    <Styles>
      <div className='container'>
        <div className='data-card-cont'>
          <DataCards name={"Clicks"} value={200}/>
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