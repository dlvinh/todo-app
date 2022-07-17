export type ITodo = { // Tuong tu nhu dat object voi cac properties ben trong
    id: number,
    title: string | undefined,
    completed: boolean,
    editable: boolean
  }

export class NewTask {
  static greatNewTask (newTask: ITodo){
    return {id:newTask.id, title: newTask.title, completed: newTask.completed,editable: newTask.editable}
  }
}

