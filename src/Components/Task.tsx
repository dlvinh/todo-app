import { CheckOutlined, DeleteOutline, EditOutlined, UndoRounded } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import React, { memo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ITodo, IToDoList } from '../Models/Todo';
import { AppDispatch } from '../Redux/ReduxConfigure';
import { checkTaskAction, deleteTaskAction, saveEditTaskAction, undoTask } from '../Services/ServiceActions';
const useAppDispatch: ()=> AppDispatch = useDispatch
export  function Task(props: any) {
    const { item } = props
    let editRef = useRef<any>(null);
    // console.log("render Task");
    const dispatch = useAppDispatch();
    const renderAction = (item: any) => {
        if (item.editable) {
            return <td>
                <ButtonGroup>
                    <Button color="primary" onClick={() => {
                        dispatch(saveEditTaskAction({ ...item, title: editRef.current.value, editable: false }))
                    }}>Save</Button>
                    <Button color="error" onClick={() => {
                        dispatch({
                            type: "CANCEL_EDIT",
                            data: { ...item, editable: false }
                        })
                    }}>Cancel</Button>
                </ButtonGroup>
            </td>
        }
        if (item.completed) {
            return <td> <ButtonGroup>
                <IconButton color="primary" onClick={() => {
                    dispatch(undoTask(item));
                }}>
                    <UndoRounded></UndoRounded>
                </IconButton>
                <IconButton color="error" onClick={() => {
                    dispatch(deleteTaskAction(item))
                }}>
                    <DeleteOutline></DeleteOutline>
                </IconButton>
            </ButtonGroup>
            </td>
        }
        return  <td>
        <ButtonGroup>
            <IconButton color="success" onClick={() => {
                dispatch(checkTaskAction(item));
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
                dispatch(deleteTaskAction(item))
            }}>
                <DeleteOutline></DeleteOutline>
            </IconButton>
        </ButtonGroup>
    </td>;
    }

    return (
        <tr className="task-row" draggable onDragStart={(e)=>{
            console.log("on drag start",item);
            e.dataTransfer.setData("item",JSON.stringify(item));
        }}>
            <td>{item.id}</td>
            <td>{item.editable ? <input defaultValue={item.title} ref={editRef} onChange={() => {
                console.log("editref", editRef.current.value);
            }} ></input> : <span onClick={()=>{
                console.log("edit")
                dispatch({
                    type:"EDIT_TASK",
                    data:item
                })
            }}>{item.title}</span>}</td>
            {renderAction(item)}
        </tr>
    )
}

export default memo(Task);