import React, {useState, createContext} from "react";

export const LeagueContext = createContext();

export const LeagueProvider = props => {
    const [leagues, setLeagues] = useState([
        {
            name: 'Újbuda Liga'
        }
    ]);

    const [subLeagues, setSubLeagues] = useState([
        {
            name: 'Hétfő'
        },
        {
            name: 'Kedd'
        },
        {
            name: 'Szerda'
        },
        {
            name: 'Csütörtök'
        },
        {
            name: 'Péntek'
        },
    ]);

    return(
        <LeagueContext.Provider value={{ leaguesList: [leagues, setSubLeagues], subLeaguesList: [subLeagues, setLeagues]}}>
            {props.children}
        </LeagueContext.Provider>
    )
}