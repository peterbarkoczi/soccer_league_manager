import React, {useState, createContext} from "react";

export const CupsContext = createContext();

export const CupsProvider = props => {
    const [cups, setCups] = useState([]);

    return (
        <CupsContext.Provider value={{cups, setCups}}>
            {props.children}
        </CupsContext.Provider>
    )
}