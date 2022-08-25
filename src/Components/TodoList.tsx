import { CheckOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { ITodo, IToDoList } from '../Models/Todo'
import _ from "lodash";
import { Context } from './ToDoPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/ReduxConfigure';
import { responsiveProperty } from '@mui/material/styles/cssUtils';


function TodoList() {

    const todoLst = useSelector((state: RootState) => state.AppState);
    const [editTask, setEditTask] = useState<Boolean>(false);
    const filteredData = _.filter(todoLst.data, (item) => {

        return item.completed == false
    })
    const dispatch = useDispatch();
    let editRef = useRef<any>(null);
    const DeleteTask = async (task: ITodo) => {
        try {
            const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}.json`, {
                method: "DELETE",
                headers: {
                    "Context-Type": "application/json"
                },
            })
            console.log({ response })
            if (response.status == 200) {
                dispatch({
                    type: "DELETE_TASK",
                    data: task
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const CheckTask = async (task: ITodo) => {
        try {
            const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}/completed.json`, {
                method: "PUT",
                headers: {
                    "Context-Type": "application/json"
                },
                body: "true"
            })
            if (response.status == 200) {
                dispatch({
                    type: "CHECK_TASK",
                    data: { ...task, completed: true }
                })
            }
        } catch (error) {
            alert("Error")
        }


    }

    const SaveEditTask = async (task: ITodo) => {
        console.log("task",task.title)
        try {
            const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}.json/`, {
                method: 'PUT',
                headers: {
                    "Context-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
            if (response.status == 200) {
                dispatch({
                    type: "SAVE_EDIT",
                    data: task
                })
            }
        } catch (err) {

        }

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
                    {filteredData.map((item, index) => {
                        if (item.editable) {
                            return <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.editable ? <input defaultValue={item.title} ref={editRef} onChange={() => {
                                    console.log("editref", editRef.current.value);
                                }} ></input> : item.title}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => {
                                            SaveEditTask({ ...item, title: editRef.current.value,editable:false})
                                        }}>Save</Button>
                                        <Button color="error" onClick={() => {
                                            dispatch({
                                                type: "CANCEL_EDIT",
                                                data: { ...item, editable: false }
                                            })
                                        }}>Cancel</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        }
                        return <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>
                                <ButtonGroup>
                                    <IconButton color="success" onClick={() => {
                                        CheckTask(item);
                                    }}>
                                        <CheckOutlined ></CheckOutlined>
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => {
                                        dispatch({
                                            type: "EDIT_TASK",
                                            data: item
                                        })
                                    }}>
                                        <EditOutlined></EditOutlined>
                                    </IconButton>
                                    <IconButton color="error" onClick={() => {
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
