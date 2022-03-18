import React,{useState,useEffect} from 'react'
import styled from "styled-components"

const Style = styled.div`
border:1px solid #E0E0E0;
min-width:10rem;

border-radius:1.2rem;
box-shadow: 0px 4px 4px 0px #00000040;
min-height:200px;
overflow-X:auto;
.scroll-table{
    min-width:max-content;
    padding:0.8rem 1rem;
    &>table{
        min-width:100%;
    }
}

.t-head,.t-row{
    .t-cell{
        text-align:Center;
        padding:0.2rem 1rem;
    }
}
.t-head{
    &>.t-cell{
        font-weight:500;
        border-bottom:1px solid #E0E0E0;
        white-space:nowrap;
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
        <tr className='t-row'>
            {
                schema.map((column,idx)=>(
                    <td className='t-cell' key={row[column.id+idx+"cell"]}>
                        {row[column.id]?row[column.id]:"NULL"}
                    </td>
                ))
            }
        </tr>
    )
}
const Table = ({schema=sampleSchema,data=[]}) => {

  return (
    <Style className='table-cont'>
        <div className='scroll-table'>
            <table className='table'>
                <tr className='t-head'>
                    {
                        schema.map((cell,idx)=>(
                            <th className='t-cell' key={idx+cell.id}>{cell.name}</th>
                        ))
                    }
                </tr>
                {
                    data&&
                    data.map((row,idx)=>(
                        <TableRow schema={schema} row={row} key={idx+"row"}/>
                    ))
                }
            </table>
        </div>
    </Style>
  )
}

export default Table