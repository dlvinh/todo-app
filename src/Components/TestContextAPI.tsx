
import React, { useContext } from 'react'
import { Context } from './ToDoPage'

export default function TestContextAPI<Type>(prosp:Type) {
    const value = useContext(Context);
    console.log("value",value)
  return (
    <div>
        {/* {value?.map((item)=>{
            return <h2>{item.title}</h2>
        })}
        <button>Change name</button> */}
    </div>
  )
}
