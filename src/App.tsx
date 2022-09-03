
import "styled-components";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import ToDoPage from './Components/ToDoPage';
import styled, { ThemeProvider } from 'styled-components';
import theme, { dark, light } from './Theme/theme';
import { FormControlLabel, Switch } from "@mui/material";
function App() {
    const dispatch = useDispatch();
    const [showDark, setShowDark] = useState<boolean>(false);
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
                if (response.status === 200) {
                    const data = await response.json();
                    // console.log({data})
                    // console.log({entries})
                    dispatch({
                        type: "STORE_DATA",
                        data: data
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchingData();
    }, []);
    const switchThemeHandler = () => {
        setShowDark(!showDark);
    }
    const CustomDiv = styled.div`
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.header};

    `
    console.log("redner again")
    return (
        <ThemeProvider theme={!showDark ? light : dark}>
            <label htmlFor="checked-toggle" className="inline-flex relative items-center cursor-pointer switch">
                <input onChange={switchThemeHandler} type="checkbox" id="checked-toggle" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600" />
                <span className="ml-3 text-sm font-bold text-pink-600 dark:text-pink-600">{!showDark? "Light":"Dark"}</span>
            </label>

            <CustomDiv className='h-screen'>
                <ToDoPage showDark={showDark}></ToDoPage>
            </CustomDiv>
        </ThemeProvider>


    );
}

export default App;
