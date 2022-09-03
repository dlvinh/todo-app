import { CheckOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { ITodo, IToDoList } from '../Models/Todo'
import _ from "lodash";
import { Context } from './ToDoPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/ReduxConfigure';
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import Task from './Task';
import { undoTask } from '../Services/ServiceActions';

const useAppDispatch: ()=> AppDispatch = useDispatch
function TodoList() {

    const todoLst = useSelector((state: RootState) => state.AppState);
    const [editTask, setEditTask] = useState<Boolean>(false);
    const filteredData = _.filter(todoLst.data, (item) => {
        return item.completed == false
    })
    const dispatch = useAppDispatch();
    return (
        <div className='todo-task-container' onDragOver={(e)=>{
            e.preventDefault();
        }} onDrop={(e)=>{
            e.preventDefault();
            const item = JSON.parse(e.dataTransfer.getData("item"));
            dispatch(undoTask(item));
        }}>
            <h1 className='text-center font-bold text-4xl'>Task List</h1>
            <table className='table-fixed w-full text-center uncompleted-task' >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => {
                        return <Task key={index} item={item}></Task>
                    })}
                </tbody>
            </table>
            {todoLst.data.length === 0 ? <h3 className='text-center text-red-500 font-semibold'>NO TASK AVAILABLE</h3> : ""}
        </div>
    )
}
export default memo(TodoList);
