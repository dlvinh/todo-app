import { Button, IconButton } from '@mui/material';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { ITodo, IToDoList, NewTask } from '../Models/Todo';
import CompletedTask from './CompletedTask';
import TodoList from './TodoList';
import _, { method } from "lodash";
import { useDispatch, useSelector } from 'react-redux'
import { AppStateReducer } from '../Redux/Reducers/AppReducer';
import { RootState } from '../Redux/ReduxConfigure';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useSpring, useTransition, animated } from 'react-spring';
import './style.css';
export const Context = createContext<IToDoList | any>(null);
// interface scopeState ={
//     showAdd: boolean
// }

interface globalState {
    isLoading: boolean;
    hasError: boolean;
}
export default function ToDoPage() {
    const todoLst = useSelector((state: RootState) => state.AppState)
    let inputRef = useRef<any>(null);
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const dispatch = useDispatch();
    const [globalState, setGlobalState] = useState<globalState>({
        isLoading: false,
        hasError: false
    })
    console.log(todoLst.data.length)

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const response = await fetch("https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task.json",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                if(response.status === 200){
                    const data = await response.json();
                    dispatch({
                        type: "STORE_DATA",
                        data: data
                    })
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchingData();
    }, [])


    const showAddTask = () => {
        if (showAdd) {
            return <div >
                <IconButton className='remove-task' color="error" onClick={() => {
                    setShowAdd(false);
                }}>
                    <RemoveCircleOutlineOutlinedIcon fontSize='large' ></RemoveCircleOutlineOutlinedIcon>
                </IconButton>
            </div>
        }
        return <div className="col-end-6">
            <IconButton className='add-task ' color="primary" onClick={() => {
                setShowAdd(true);
            }}>
                <AddCircleOutlineOutlinedIcon fontSize='large' ></AddCircleOutlineOutlinedIcon>
            </IconButton>
        </div>
    }

    return (
        <div className='w-8/12 mx-auto'>
            <h1 className='text-center text-5xl font-bold'>To Do App</h1>
            <hr></hr>
            <section id="add-new-task" className='my-5 grid grid-cols-5' >
                <div className='col-span-4 overflow-hidden' >
                    
                    <animated.input ref={inputRef} onKeyDown={(e) => {
                        if (e.key == "Enter") {
                           
                            let task = NewTask.greatNewTask({
                                id: todoLst.data.length + 1,
                                title: inputRef.current?.value,
                                completed: false,
                                editable: false,
                            })
                            e.target.value = "";
                            setCount(count + 1);
                            dispatch({
                                type: "ADD_TASK",
                                data: task
                            })
                            try{
                                fetch("https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task.json",{
                                    method:"POST",
                                    headers:{
                                        "Context-Type": "application/json"
                                    },
                                    body: JSON.stringify(task)
                                })
                            }catch(error){
                                alert(error)
                            }
                          
                        }
                    }} onChange={() => {
                        // setTodoLst({ ...todoLst, text: inputRef.current.value })
                        // console.log(inputRef.current.value)
                    }} className={`text-2xl px-2 h-full border-solid  border-1 border-black w-full ${showAdd ? "show-text" : "hide-text"} `} type="text" placeholder='Add new task' id="add-task-input" />
                </div>
                {showAddTask()}
            </section>
            {/* <TestContextAPI></TestContextAPI> */}
            <hr></hr>

            <TodoList></TodoList>
            <hr></hr>
            <CompletedTask></CompletedTask>
        </div>
    )
}


// NOTE FOR CONTEXT API IN TYPESRIPT
/**
 *  Can phai tao interface sao cho phu hop de cac children component co the lien ket duoc => code kha dai nhung chi tiet
 * Giong nhu su dung props, cac gia tri hay function deu phai viet tren parent component sau do gia tri moi cua state se duoc update nguoc lai len cho context aka parent
 *  
 * 
 */
