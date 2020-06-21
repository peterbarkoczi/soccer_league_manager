import React, {useState, createContext} from "react";

export const LeagueContext = createContext();

export const LeagueProvider = props => {
    const [leagues, setLeagues] = useState([]);
    const [subLeagues, setSubLeagues] = useState([]);

    return (
        <LeagueContext.Provider value={{leagues, setSubLeagues, subLeagues, setLeagues}}>
            {props.children}
        </LeagueContext.Provider>
    )
}