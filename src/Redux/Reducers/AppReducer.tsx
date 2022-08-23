import { ITodo, NewTask } from "../../Models/Todo";
import _, { isNull } from 'lodash';
import { SettingsEthernet } from "@mui/icons-material";
import { parse } from "node:path/win32";
interface defaultStateInterface{
    data: ITodo[],
}

let defaultState: | defaultStateInterface = {data:[]};



export const AppStateReducer = (state = defaultState,action:any)=>{

    switch(action.type){
        case "STORE_DATA":{
            console.log("STORE_DATA",action.data);
            if (action.data == null){
                return {...state};
            }else{
                let cloneList = [...state.data];
                for (const key in action.data){
                    cloneList.push({
                        id: action.data[key].id,
                        title: action.data[key].title,
                        completed: action.data[key].completed,
                        editable: action.data[key].editable
                    })
                }
                return {...state, data: cloneList};
            }
           
        }
        case "ADD_TASK": {
            // Nen cloneList to avoid state mutation (mutate state)
            let cloneList = [...state.data];
            //state.prevId += 1;
            cloneList.push(action.data);
    
            return {...state, data:cloneList};
        }
        case "DELETE_TASK":{
            console.log("taskDelete");
            let cloneList = [...state.data];
            let newList = _.filter(cloneList, (item) => {
                return item.id !== action.data.id;
            })
          
            return {...state, data:newList}
        }
        case "CHECK_TASK":{
            console.log("CHECK_TASK");
            let cloneList = [...state.data];
            let index = state.data.findIndex((task)=> task.id === action.data.id)
            cloneList[index].completed = true;
          
            return {...state, data: cloneList}
        }
        case "UNDO_TASK":{
            console.log("UNDO_TASK");
            let cloneList = [...state.data];
            let index = state.data.findIndex((task)=> task.id === action.data.id)
            cloneList[index].completed = false;
        
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

            return {...state,data:newList}
        }
        case "CANCEL_EDIT":{
            console.log("CANCEL_EDIT");
            let cloneList = [...state.data];
            let index = state.data.findIndex((task)=> task.id === action.data.id)
            cloneList[index].editable = false;
     
            return {...state, data: cloneList}
        }
        default: return {...state};
    }
}
