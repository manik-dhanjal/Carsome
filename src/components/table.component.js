import React from 'react'
import styled from "styled-components"

const Style = styled.div`
border:1px solid #E0E0E0;
min-width:10rem;
background:white;
border-radius:1.2rem;
box-shadow: 0px 4px 4px 0px #00000040;
min-height:200px;
overflow-X:auto;
.scroll-table{
    min-width:max-content;
    padding:0.8rem 1rem;
    &>table{
        min-width:100%;
        border:collapse;
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
.t-row{
    &>.t-cell{
        font-size:0.9em;
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
// const sampleData = [
//     {
//         clicks:"1233",
//         clicks2:"123",
//         clicks3:"33",
//     },{
//         clicks:"1233",
//         clicks2:"123",
//         click2:"123222",
//         clicks3:"33",
//     },{
//         clicks2:"123",
//         clicks3:"33",
//     },
// ]
const TableRow = ({row,schema,r_idx}) => {
    return(
        <tr className='t-row'>
            {
                schema.map((column,c_idx)=>(
                    <td className='t-cell' key={"cell"+c_idx+""+r_idx}>
                           {column.dataModifier?column.dataModifier(row[column.id]):row[column.id]}
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
                <thead>
                    <tr className='t-head'>
                        {
                            schema.map((cell,idx)=>(
                                <th className='t-cell' key={idx+cell.id} >{cell.name}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data&&
                        data.map((row,idx)=>(
                            <TableRow schema={schema} row={row} key={idx+"row"} r_idx={idx}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </Style>
  )
}

export default Table