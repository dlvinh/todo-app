import { DeleteOutline, EditOutlined, UndoRounded } from '@mui/icons-material'
import { ButtonGroup, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import { ITodo, IToDoList } from '../Models/Todo'
import _ from "lodash";
import { Context } from './ToDoPage';



export default function CompletedTask() {
    const context = useContext(Context);
     console.log("tododls",context);
    
    const data = context?.data;
    const OnUndo = context.OnUndo;
    const OnDelete = context.OnDelete;
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
                                OnUndo(item);
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


