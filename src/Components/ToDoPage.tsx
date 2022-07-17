import { Button } from '@mui/material';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { ITodo, IToDoList, NewTask } from '../Models/Todo';
import CompletedTask from './CompletedTask';
import TodoList from './TodoList';
import _, { flatMap } from "lodash";
import { ConstructionOutlined } from '@mui/icons-material';
import { Type } from 'typescript';
import TestContextAPI from './TestContextAPI';

let data = [
    NewTask.greatNewTask({
        id: Math.floor(Math.random() * 100) + 1,
        title: "first task",
        completed: true,
        editable: false,
    }),
    NewTask.greatNewTask({
        id: Math.floor(Math.random() * 100) + 1,
        title: "second task",
        completed: false,
        editable: false,
    }),
    NewTask.greatNewTask({
        id: Math.floor(Math.random() * 100) + 1,
        title: "third task",
        completed: true,
        editable: false,
    })
]

export const Context = createContext<IToDoList | any>(null) 
export default function ToDoPage() {
    let [todoLst, setTodoLst] = useState({
        data: data,
        text: ""
    });
    let inputRef = useRef<any>(null);
    useEffect(() => {
        console.log({ todoLst })
    }, [todoLst])


    const DeleteTask = (task: ITodo) => {
        console.log("taskDelete", task);
        let newList = _.filter(todoLst.data, (item) => {
            return item.id !== task.id;
        })
        setTodoLst({ ...todoLst, data: newList });
    }

    const CheckTask = (task: ITodo) => {
        task.completed = true;
        console.log("taskChecked", task);
        // let newList = todoLst.map((item)=>{
        //     if (item.id == task.id){
        //         item.completed = true;
        //     }
        //     return item
        // })

        setTodoLst({ ...todoLst });
    }

    const UndoTask = (task: ITodo) => {
        task.completed = false;
        setTodoLst({ ...todoLst });
    }

    const EditTask = (task: ITodo) => {
        _.map(todoLst.data, (item) => {
            if (item.editable) {
                item.editable = false;
            }
            return item
        })
        task.editable = true;
        setTodoLst({ ...todoLst });
    }

    const CancelEditor = (task: ITodo) => {
        task.editable = false;
        setTodoLst({ ...todoLst });
    }
    const SaveEditTask = (task: ITodo) => {
        let newList = todoLst.data.map((item) => {
            if (task.id == item.id) {
                item = task
            }
            return item
        })
        console.log("edittedTask", newList);
        setTodoLst({ ...todoLst, data: newList })
    }
    return (
        <div className='mx-52'>
            <h1 className='text-center text-2xl font-bold'>To Do App</h1>
            <hr></hr>
            <section id="add-new-task" className='my-5'>
                <label htmlFor='newtask'>New Task: </label>
                <input ref={inputRef} onChange={() => {
                    setTodoLst({ ...todoLst, text: inputRef.current.value })
                    console.log(inputRef.current.e)
                }} value={todoLst.text} className='border-solid border-2 border-black' type="text" placeholder='Add new task' id="newtask" />
                <Button variant="contained" data-testid="addtask" onClick={() => {
                    let task = NewTask.greatNewTask({
                        id: Math.floor(Math.random() * 100) + 1,
                        title: inputRef.current?.value,
                        completed: false,
                        editable: false,
                    })
                    todoLst.data.push(task);
                    setTodoLst({
                        ...todoLst,
                        text: ""
                    })
                }}>Add new</Button>
            </section>
            <Context.Provider value={{
                data: todoLst.data,
                OnDelete: DeleteTask,
                OnCheckTask: CheckTask,
                OnEditTask: EditTask,
                OnCancelEditor: CancelEditor,
                OnSaveEditTask: SaveEditTask,
                OnUndo: UndoTask,
            }}>
                {/* <TestContextAPI></TestContextAPI> */}
                <hr></hr>
                {/* <TodoList data-testid="todolistdata" OnSaveEditTask={SaveEditTask} OnCancelEditor={CancelEditor} OnEditTask={EditTask} OnDelete={DeleteTask} OnCheckTask={CheckTask} data={todoLst.data}></TodoList> */}
                <TodoList></TodoList>
                <hr></hr>
                <CompletedTask></CompletedTask>
            </Context.Provider>

            <hr></hr>
            {/* <CompletedTask OnDelete={DeleteTask} OnUndo={UndoTask} data={todoLst.data}></CompletedTask> */}
           
        </div>
    )
}


// NOTE FOR CONTEXT API IN TYPESRIPT
/**
 *  Can phai tao interface sao cho phu hop de cac children component co the lien ket duoc => code kha dai nhung chi tiet
 * Giong nhu 
 *  
 * 
 */
