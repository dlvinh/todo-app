import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ITodo, NewTask } from '../Models/Todo';
import CompletedTask from './CompletedTask';
import TodoList from './TodoList';
import _, { flatMap } from "lodash";
import { ConstructionOutlined } from '@mui/icons-material';
import { Type } from 'typescript';

let data =[
    NewTask.greatNewTask({
        id: Math.floor(Math.random() * 100) +1,
        title: "first task",
        completed: true,
        editable: false,
    }),
    NewTask.greatNewTask({
        id: Math.floor(Math.random() * 100) +1,
        title: "second task",
        completed: false,
        editable: false,
    }),
    NewTask.greatNewTask({
        id: Math.floor(Math.random() * 100) +1,
        title: "third task",
        completed: true,
        editable: false,
    })
]

export default function ToDoPage() {
    let newtask: ITodo = {
        id: 1,
        title: "first task",
        completed: false,
        editable: false,
    }
    let [todoLst,setTodoLst] = useState({
        data: data,
        text: ""
    });
    let inputRef = useRef<any>(null);
    useEffect(()=>{
        console.log({todoLst})
    },[todoLst])
    

    const DeleteTask = (task:ITodo)=>{    
        console.log("taskDelete",task);
        let newList = _.filter(todoLst.data,(item)=>{
            return item.id !== task.id;
        })
        setTodoLst({...todoLst, data: newList});
    }   

    const CheckTask = (task:ITodo)=>{
        task.completed = true;
        console.log("taskChecked", task);
        // let newList = todoLst.map((item)=>{
        //     if (item.id == task.id){
        //         item.completed = true;
        //     }
        //     return item
        // })

        setTodoLst({...todoLst});
    }
    
    const UndoTask = (task:ITodo)=>{
        task.completed = false;
        setTodoLst({...todoLst});
    }
    
    const EditTask = (task:ITodo)=>{
        _.map(todoLst.data,(item)=>{
            if (item.editable){
                item.editable = false;
            }
            return item
        })
        task.editable =  true;
        setTodoLst({...todoLst});
    }

    const CancelEditor = (task:ITodo)=>{
        task.editable = false;
        setTodoLst({...todoLst});
    }
    const SaveEditTask = (task:ITodo)=>{
        let newList = todoLst.data.map((item)=>{
            if(task.id == item.id){
                item = task
            }
            return item
        })
        console.log("edittedTask",newList);
        setTodoLst({...todoLst, data: newList})
    }
    return (
        <div className='mx-52'>
            <h1 className='text-center text-2xl font-bold'>To Do App</h1>
            <hr></hr>
            <section id="add-new-task" className='my-5'>
                <label htmlFor='newtask'>New Task: </label>
                <input ref={inputRef} onChange={()=>{
                    setTodoLst({...todoLst,text: inputRef.current.value})
                }} value={todoLst.text} className='border-solid border-2 border-black' type="text" placeholder='Add new task' id="newtask" />
                <Button variant="contained" data-testid="addtask" onClick={()=>{
                    let task = NewTask.greatNewTask({
                    id: Math.floor(Math.random() * 100) +1,
                    title: inputRef.current?.value,
                    completed: false,
                    editable: false,
                    })
                    todoLst.data.push(task);
                    setTodoLst({...todoLst,
                        text:""})
                }}>Add new</Button>
            </section>
            <hr></hr>
            <TodoList data-testid="todolistdata" OnSaveEditTask={SaveEditTask} OnCancelEditor={CancelEditor}  OnEditTask= {EditTask} OnDelete= {DeleteTask} OnCheckTask = {CheckTask} data={todoLst.data} newtask= {newtask}></TodoList>
            <hr></hr>
            <CompletedTask OnDelete={DeleteTask} OnUndo = {UndoTask} data={todoLst.data} newtask= {newtask}></CompletedTask>
        </div>
    )
}
