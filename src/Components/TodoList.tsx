import {  CheckOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import React, { memo, useContext, useRef } from 'react'
import {  ITodo, IToDoList } from '../Models/Todo'
import _ from "lodash";
import { Context } from './ToDoPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/ReduxConfigure';


 function TodoList() {
    
    const todoLst = useSelector( (state:RootState)=> state.AppState );
   const filteredData = _.filter(todoLst.data, (item)=>{
    console.log(item);
       return item.completed == false
    })
    const dispatch = useDispatch();
    let editRef = useRef<any>(null);
     const DeleteTask = (task: ITodo) => {
        dispatch({
            type:"DELETE_TASK",
            data: task
        })
    }

    const CheckTask = (task: ITodo) => {
        dispatch({
            type:"CHECK_TASK",
            data: task
        })
    }

    const EditTask = (task: ITodo) => {
        dispatch({
            type:"EDIT_TASK",
            data: task
        })
    }
    const SaveEditTask = (task: ITodo) => {
        dispatch({
            type:"SAVE_EDIT",
            data:task
        })
    }
    
    const CancelEditor = (task: ITodo) => {
        dispatch({
            type:"CANCEL_EDIT",
            data: task
        })
    }

  
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
                                SaveEditTask({...item, title: editRef.current.value, editable: false})
                            }}>Save</Button>
                            <Button color= "error" onClick={()=>{
                                CancelEditor(item)
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
                                CheckTask(item);
                            }}>
                                <CheckOutlined ></CheckOutlined>
                            </IconButton>
                            <IconButton color="primary" onClick={()=>{
                                EditTask(item);
                            }}>
                               <EditOutlined></EditOutlined>
                            </IconButton>
                            <IconButton color="error" onClick={()=>{
                                DeleteTask(item);
                            }}>
                                <DeleteOutline></DeleteOutline>
                            </IconButton>
                        </ButtonGroup>
                    </td>
                </tr>
               })}
            </tbody>
        </table>
        {todoLst.data.length == 0 ? <h3 className='text-center text-red-500 font-semibold'>NO TASK AVAILABLE</h3> : ""}
    </div>
  )
}
export default memo(TodoList);
