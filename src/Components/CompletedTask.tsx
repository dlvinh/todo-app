import { DeleteOutline, EditOutlined, UndoRounded } from '@mui/icons-material'
import { ButtonGroup, IconButton } from '@mui/material'
import React from 'react'
import { ITodo } from '../Models/Todo'
import _ from "lodash";


interface IToDoList {
    data: Array<ITodo>,
    newtask: ITodo | undefined,
    OnDelete: (task:ITodo)=> void,
    OnUndo: (task:ITodo)=> void,
}
export default function CompletedTask({data,newtask,OnDelete,OnUndo}:IToDoList ) {
   const filteredData =  _.filter(data, (item)=>{
        return item.completed == true
     })
   return (
     <div className='todo-task-container'>
         <h1>Completed Task List</h1>
         <table className='table-fixed w-full text-center'>
             <thead>
                 <tr>
                     <th>Id</th>
                     <th>Description</th>
                     <th>Action</th>
                 </tr>
             </thead>
             <tbody>
                {filteredData.map((item,index)=>{
                 return <tr key={index}>
                     <td>{item.id}</td>
                     <td>{item.title}</td>
                     <td>
                         <ButtonGroup>
                             <IconButton color="primary" onClick={()=>{
                                OnUndo(item)
                             }}>
                                <UndoRounded></UndoRounded>
                             </IconButton>
                             <IconButton color="error" onClick={()=>{
                                OnDelete(item);
                             }}>
                                 <DeleteOutline></DeleteOutline>
                             </IconButton>
                         </ButtonGroup>
                     </td>
                 </tr>
                })}
             </tbody>
         </table>
     </div>
   )
}


