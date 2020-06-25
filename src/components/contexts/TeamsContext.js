import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const TeamsContext = createContext();

export const TeamsProvider = props => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/teams`)
            .then((response) => setTeams(response.data))
    }, [setTeams]);

    return (
        <TeamsContext.Provider value={{teams, setTeams}}>
            {props.children}
        </TeamsContext.Provider>
    );

}