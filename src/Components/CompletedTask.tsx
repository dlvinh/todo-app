import { DeleteOutline, EditOutlined, UndoRounded } from '@mui/icons-material'
import { ButtonGroup, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import { ITodo, IToDoList } from '../Models/Todo'
import _ from "lodash";
import { Context } from './ToDoPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/ReduxConfigure';



export default function CompletedTask() {

    const todoLst = useSelector((state: RootState) => state.AppState)

    const dispatch = useDispatch();

    const filteredData = _.filter(todoLst.data, (item) => {
        return item.completed == true
    })
    const UndoTask = async (task: ITodo) => {
        try {
            const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}/completed.json`, {
                method: "PUT",
                headers: {
                    "Context-Type": "application/json"
                },
                body: "false"
            })
            if (response.status == 200) {
                dispatch({
                    type: "UNDO_TASK",
                    data: task
                })
            }
        } catch (error) {
            alert("Error")
        }

    }
    const DeleteTask = async (task: ITodo) => {
        try {
            const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}.json`, {
                method: "DELETE",
                headers: {
                    "Context-Type": "application/json"
                },
            })
            if (response.status == 200) {
                dispatch({
                    type:"DELETE_TASK",
                    data: task
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
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
                    {filteredData.map((item, index) => {
                        return <tr key={index} style={{ textDecoration: "line-through" }}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>
                                <ButtonGroup>
                                    <IconButton color="primary" onClick={() => {
                                        UndoTask(item);
                                    }}>
                                        <UndoRounded></UndoRounded>
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


