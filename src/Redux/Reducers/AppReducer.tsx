import { ITodo, NewTask } from "../../Models/Todo";
import _, { isNull } from 'lodash';
import { SettingsEthernet } from "@mui/icons-material";
import { parse } from "node:path/win32";
interface defaultStateInterface{
    data: ITodo[],
    prevId: 0
    text:string
}


let localdata : defaultStateInterface |null | string= localStorage.getItem("TASK_LIST"); 
let defaultState: | defaultStateInterface = {data:[],text:"",prevId:0};
console.log("localdata",isNull(localdata));
if (isNull(localdata)){
    localStorage.setItem("TASK_LIST",JSON.stringify({data:[],text:"",prevId:0}))
    defaultState = {data:[],text:"",prevId:0}
}else{
    defaultState  = JSON.parse(localdata)
}
const SaveLocalStore = async (data : defaultStateInterface)=>{
    console.log(JSON.stringify(data));
    localStorage.setItem("TASK_LIST",JSON.stringify(data))
}

export const AppStateReducer = (state = defaultState,action:any)=>{

    switch(action.type){
        case "ADD_TASK": {
            // Nen cloneList to avoid state mutation (mutate state)
            let cloneList = [...state.data];
            cloneList.push(action.data);
            SaveLocalStore({...state,data:cloneList})
            return {...state, data:cloneList};
        }
        case "DELETE_TASK":{
            console.log("taskDelete");
            let cloneList = [...state.data];
            let newList = _.filter(cloneList, (item) => {
                return item.id !== action.data.id;
            })
            SaveLocalStore({...state,data:newList})
            return {...state, data:newList}
        }
        case "CHECK_TASK":{
            console.log("CHECK_TASK");
            let cloneList = [...state.data];
            let index = state.data.findIndex((task)=> task.id === action.data.id)
            cloneList[index].completed = true;
            SaveLocalStore({...state,data:cloneList})
            return {...state, data: cloneList}
        }
        case "UNDO_TASK":{
            console.log("UNDO_TASK");
            let cloneList = [...state.data];
            let index = state.data.findIndex((task)=> task.id === action.data.id)
            cloneList[index].completed = false;
            SaveLocalStore({...state,data:cloneList})
            return {...state, data: cloneList}
        }
        case "EDIT_TASK":{
            console.log("EDIT_TASK");
            let cloneList = [...state.data];
            _.map(cloneList, (item) => {
                if (item.editable) {
                    item.editable = false;
                }
                return item
            })
            action.data.editable = true;
            SaveLocalStore({...state,data:cloneList})
            return {...state, data: cloneList }
        }
        case "SAVE_EDIT":{
            let cloneList = [...state.data];
            let newList = cloneList.map((item) => {
                if (action.data.id == item.id) {
                    item = action.data
                }
                return item
            })
            SaveLocalStore({...state,data:newList})
            return {...state,data:newList}
        }
        case "CANCEL_EDIT":{
            console.log("CANCEL_EDIT");
            let cloneList = [...state.data];
            let index = state.data.findIndex((task)=> task.id === action.data.id)
            cloneList[index].editable = false;
            SaveLocalStore({...state,data:cloneList})
            return {...state, data: cloneList}
        }
        default: return {...state};
    }
}
