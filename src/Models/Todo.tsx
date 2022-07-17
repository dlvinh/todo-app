export type ITodo = { // Tuong tu nhu dat object voi cac properties ben trong
    id: number,
    title: string | undefined,
    completed: boolean,
    editable: boolean
  }

  
export interface IToDoList {
  data: Array<ITodo>,
  OnDelete: (task:ITodo)=> void ,
  OnCheckTask: (task:ITodo)=> void ,
  OnEditTask: (task:ITodo)=> void,
  OnCancelEditor:(task:ITodo)=>void ,
  OnSaveEditTask: (task:ITodo)=> void ,
  OnUndo: (task:ITodo) => void ,
}

export class NewTask {
  static greatNewTask (newTask: ITodo){
    return {id:newTask.id, title: newTask.title, completed: newTask.completed,editable: newTask.editable}
  }
}

