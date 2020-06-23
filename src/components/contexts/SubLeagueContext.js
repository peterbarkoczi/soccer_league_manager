import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const SubLeaguesContext = createContext();

export const SubLeaguesProvider = props => {
    const [subLeagues, setSubLeagues] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/subLeagues?leagueId=${localStorage.getItem("leagueId")}`)
            .then((response) => setSubLeagues(response.data))
    }, [setSubLeagues]);

    return (
        <SubLeaguesContext.Provider value={{subLeagues, setSubLeagues}}>
            {props.children}
        </SubLeaguesContext.Provider>
    );
}