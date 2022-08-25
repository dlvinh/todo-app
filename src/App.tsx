
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import ToDoPage from './Components/ToDoPage';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchingData = async () => {
        try {
            const response = await fetch("https://to-do-app-c78fb-default-rtdb.asia-southeast1.firebasedatabase.app/task.json",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            if(response.status === 200){
                const data = await response.json();
                // console.log({data})
                // console.log({entries})
                dispatch({
                    type: "STORE_DATA",
                    data: data
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    fetchingData();
}, [])
  return (
    <div className='container w-8/12 my-32 py-20 h-full' style={{backgroundColor:"#e6be7e99", borderRadius:"20px"}}>
      <ToDoPage></ToDoPage>
    </div>
  );
}

export default App;
