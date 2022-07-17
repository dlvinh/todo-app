import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { NewTask } from './Models/Todo';
import ToDoPage from './Components/ToDoPage';

//  

test('Add new task', ()=>{
  render(<ToDoPage></ToDoPage>);
  const taskList = screen.getByTestId("addtask")
  
  // let newtask = NewTask.greatNewTask({id: 90,
  //   title: "second task",
  //   completed: false,
  //   editable: false,});
})