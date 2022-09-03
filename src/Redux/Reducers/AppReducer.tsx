import { ITodo, NewTask } from "../../Models/Todo";
import _ from 'lodash';
interface defaultStateInterface{
    data: ITodo[],
}

let defaultState: | defaultStateInterface = {data:[]};



export const AppStateReducer = (state = defaultState,action:any)=>{
    //console.log({state});
    switch(action.type){
        case "STORE_DATA":{
            // console.log("STORE_DATA",action.data);
            if (action.data == null){
                return {...state};
            }else{
                let cloneList = [...state.data];
                for (let key in action.data){
                    cloneList.push({
                        id: action.data[key].id,
                        title: action.data[key].title,
                        completed: action.data[key].completed,
                        editable: action.data[key].editable,
                        key: key
                    })
                }
                return {...state, data: cloneList};
            }
           
        }
        case "ADD_TASK": {
            // Nen cloneList to avoid state mutation (mutate state)
            // console.log("Add_Task", action.data)
            let cloneList = [...state.data];
            //state.prevId += 1;
            cloneList.push(action.data);
    
            return {...state, data:cloneList};
        }
        case "DELETE_TASK":{
            // console.log("taskDelete");
            let cloneList = [...state.data];
            let newList = _.filter(cloneList, (item) => {
                return item.key !== action.data.key;
            })
          
            return {...state, data:newList}
        }
        case "CHECK_TASK":{
            //console.log("CHECK_TASK",action.data);
            // const cloneList = [...state.data];
            // console.log(cloneList);
            /**
             * BIG NOTE::: 
             * We should change the entire item instead of only its properties because it will cause 
             * "Although nextList and list are two different arrays, nextList[0] and list[0] point to the same object. So by changing nextList[0].seen, you are also changing list[0].seen"
             */
            const newarrr = state.data.map((item)=>{
                if(item.key === action.data.key){
                   return item = action.data;
                }
                return item;
            })
            // console.log('cloneListCheck',newarrr);
            return {...state, data:newarrr}
        }
        case "UNDO_TASK":{
            // console.log("UNDO_TASK",action.data);
            // console.log({...action.data,completed:false})
            const newList = state.data.map((item)=>{
                if (item.key === action.data.key){
                    return item = {...action.data,completed: false};
                }
                return item
            })
            return {...state, data: newList}
        }
        case "EDIT_TASK":{
            // console.log("EDIT_TASK",action.data);
            const newList = _.map(state.data, (item) => {
                if (item.key == action.data.key){
                    return item = {...action.data, editable: true}
                }
                return {...item, editable:false};
            })
         
            return {...state, data: newList }
        }
        case "SAVE_EDIT":{
            // console.log("SAVE_EDIT",action.data)
            let newList = state.data.map((item) => {
                if (action.data.key == item.key) {
                    item = {...action.data,editable:false}
                }
                return item
            })

            return {...state,data:newList}
        }
        case "CANCEL_EDIT":{
            // console.log("CANCEL_EDIT",action.data);
            const newList = _.map(state.data, (item) => {
                if (item.key == action.data.key){
                    return item = {...action.data, editable: false}
                }
                return item;
            })
         
            return {...state, data: newList }
        }
        default: return {...state};
    }
}
