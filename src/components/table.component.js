import React,{useState,useEffect} from 'react'
import styled from "styled-components"

const Style = styled.div`
border:1px solid #E0E0E0;
min-width:10rem;
padding:1rem 2rem;
border-radius:1.2rem;
box-shadow: 0px 4px 4px 0px #00000040;
min-height:200px;
.t-head,.t-row{
    display:flex;
    align-items:center;
    justify-content:stretch;
    padding:0.5rem;
    .t-cell{
        text-align:Center;
        width:100%;
    }
}
.t-head{
    &>.t-cell{
        font-weight:500;
    }
}
hr{
    color:#E0E0E0;
}
`
const sampleSchema = [
    {
        name:"Clicks",
        id:"clicks"
    },
    {
        name:"Clicks 2",
        id:"clicks2"
    },{
        name:"Clicks 3",
        id:"clicks3"
    }
]
const sampleData = [
    {
        clicks:"1233",
        clicks2:"123",
        clicks3:"33",
    },{
        clicks:"1233",
        clicks2:"123",
        click2:"123222",
        clicks3:"33",
    },{
        clicks2:"123",
        clicks3:"33",
    },
]
const TableRow = ({row,schema}) => {
    return(
        <div className='t-row'>
            {
                schema.map((column,idx)=>(
                    <div className='t-cell' key={row[column.id+idx+"cell"]}>
                        {row[column.id]?row[column.id]:"NULL"}
                    </div>
                ))
            }
        </div>
    )
}
const Table = ({schema=sampleSchema,data=[]}) => {

  return (
    <Style className='table'>
        <div className='t-head'>
            {
                schema.map((cell,idx)=>(
                    <div className='t-cell' key={idx+cell.id}>{cell.name}</div>
                ))
            }
        </div>
        <hr/>
        {
            data&&
            data.map((row,idx)=>(
                <TableRow schema={schema} row={row} key={idx+"row"}/>
            ))
        }
    </Style>
  )
}

export default Table