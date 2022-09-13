import { ITodo } from "../Models/Todo";
import { AppStateReducer1 } from "../Redux/Reducers/AppReducer";

export const checkTaskAction = (task: ITodo) => async (dispatch:any)=> {
    console.log("thunk here");
    try {
        const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}/completed.json`, {
            method: "PUT",
            headers: {
                "Context-Type": "application/json"
            },
            body: "true"
        });
        if (response.status === 200) {
            // dispatch({
            //     type: "CHECK_TASK",
            //     data: { ...task, completed: true }
            // })
            dispatch(AppStateReducer1.actions.checkTask({...task,completed:true}));
        }
    } catch (error) {
        alert("Error")
    }
}

export const undoTask = (task: ITodo) =>async (dispatch:any) =>{
    try {
        const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}/completed.json`, {
            method: "PUT",
            headers: {
                "Context-Type": "application/json"
            },
            body: "false"
        })
        if (response.status == 200) {
            // dispatch({
            //     type: "UNDO_TASK",
            //     data: task
            // })
            dispatch(AppStateReducer1.actions.undoTask(task));
        }
    } catch (error) {
        alert("Error")
    }
}
export const deleteTaskAction =  (task: ITodo) => async (dispatch:any) => {
    try {
        const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}.json`, {
            method: "DELETE",
            headers: {
                "Context-Type": "application/json"
            },
        })
        console.log({ response })
        if (response.status === 200) {
            // dispatch({
            //     type: "DELETE_TASK",
            //     data: task
            // })
            dispatch(AppStateReducer1.actions.deleteTask(task));
        }
    } catch (err) {
        console.log(err)
    }
}

export const saveEditTaskAction = (task: ITodo) =>async (dispatch:any)=> {
    console.log("task", task.title)
    try {
        const response = await fetch(`https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task/${task.key}.json/`, {
            method: 'PUT',
            headers: {
                "Context-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        if (response.status == 200) {
            // dispatch({
            //     type: "SAVE_EDIT",
            //     data: task
            // })
            dispatch(AppStateReducer1.actions.saveEdit(task));
        }
    } catch (err) {

    }
}