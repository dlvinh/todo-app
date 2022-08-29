
import _ from "lodash";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/ReduxConfigure';
import { checkTaskAction } from "../Services/ServiceActions";
import Task from './Task';
const useAppDispatch: ()=> AppDispatch = useDispatch
export default function CompletedTask() {
   
    const todoLst = useSelector((state: RootState) => state.AppState)
    const filteredData = _.filter(todoLst.data, (item) => {
        return item.completed === true;
    })
    const dispatch = useAppDispatch();


    return (
        <div className='todo-task-container' onDrop={(e)=>{
            e.preventDefault();
            e.dataTransfer.getData("item");
            console.log("getItem",JSON.parse(e.dataTransfer.getData("item")));
            const item = JSON.parse(e.dataTransfer.getData("item"));
            // dispatch({
            //     type: "CHECK_TASK",
            //     data: {...item, completed: true}
            // })
            dispatch(checkTaskAction(item));
        }} onDragOver={(e)=>{
            e.preventDefault();
            // console.log("completed-task on drag over",e);
        }}>
            <h1>Completed Task List</h1>
            <table className='table-fixed w-full text-center completed-task' >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => {
                        return <Task item={item} key={index}></Task>
                     
                    })}
                </tbody>
            </table>
            {todoLst.data.length === 0 ? <h3 className='text-center text-red-500 font-semibold'>NO TASK AVAILABLE</h3> : ""}
            <hr></hr>
        </div>
    )
}


