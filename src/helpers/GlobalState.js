// Make a Global COntext for the whole app just use useState and useContext

import React, {useState, createContext, useEffect} from 'react';
import {api, handleError} from "./api";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if(token && userId){
            getUser(userId);
        }
    }, [token]);

    async function getUser(userId){
        try{
            const response = await api.get("/users/"+userId)
            setUser(response.data);
        } catch (error){
            console.error(
                `Something went wrong while fetching the user: \n${handleError(
                    error
                )}`
            );
        }
    }

    return (
        <GlobalContext.Provider value={{token,user,setUser, getUser}}>
            {props.children}
        </GlobalContext.Provider>
    );
}


