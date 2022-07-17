import {  CheckOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import React, { useRef } from 'react'
import {  ITodo } from '../Models/Todo'
import _ from "lodash";


interface IToDoList {
    data: Array<ITodo>,
    newtask: ITodo,
    OnDelete: (task:ITodo)=> void,
    OnCheckTask: (task:ITodo)=> void,
    OnEditTask: (task:ITodo)=> void,
    OnCancelEditor:(task:ITodo)=>void,
    OnSaveEditTask: (task:ITodo)=> void,
}
export default function TodoList({data,newtask,OnDelete,OnCheckTask,OnEditTask,OnCancelEditor,OnSaveEditTask}:IToDoList) {
    // console.log("newTask",newtask);
    // console.log("props",data);
   const filteredData = _.filter(data, (item)=>{
       return item.completed == false
    })
    let editRef = useRef<any>(null);
  return (
    <div className='todo-task-container'>
        <h1>Task List</h1>
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
                if (item.editable){
                    return  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.editable? <input defaultValue={item.title} ref = {editRef} onChange={()=>{
                        console.log("editref",editRef.current.value);
                    }} ></input>: item.title }</td>
                    <td>
                        <ButtonGroup>
                            <Button color="primary" onClick={()=>{
                                OnSaveEditTask({...item, title: editRef.current.value, editable: false})
                            }}>Save</Button>
                            <Button color= "error" onClick={()=>{
                                OnCancelEditor(item)
                            }}>Cancel</Button>
                        </ButtonGroup>
                    </td>
                </tr>
                }
                return <tr key={index}>
                    <td>{item.id}</td>
                    <td>{ item.title }</td>
                    <td>
                        <ButtonGroup>
                            <IconButton color="success" onClick={()=>{
                                OnCheckTask(item);
                            }}>
                                <CheckOutlined ></CheckOutlined>
                            </IconButton>
                            <IconButton color="primary" onClick={()=>{
                                OnEditTask(item);
                            }}>
                               <EditOutlined></EditOutlined>
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
