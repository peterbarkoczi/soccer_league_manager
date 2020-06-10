import React, {useState, createContext} from "react";

export const TeamsContext = createContext();

export const TeamsProvider = props => {
    const [teams, setTeams] = useState([
        {
            teamName: 'Kiss Team',
            id: 1
        },
        {
            teamName: 'Kopacky',
            id: 2
        },
        {
            teamName: 'AC Calciopoli',
            id: 3
        },
        {
            teamName: 'Green-Go',
            id: 4
        },
        {
            teamName: 'Avengers',
            id: 5
        },
        {
            teamName: 'TÖFC',
            id: 6
        },
        {
            teamName: 'FociFenZ',
            id: 7
        },
        {
            teamName: 'Faláb Se',
            id: 8
        },
        {
            teamName: 'Dave Krokodiljai',
            id: 9
        },
        {
            teamName: 'Májer München',
            id: 10
        },{
            teamName: 'X-Taki',
            id: 11
        }
    ]);
    return (
        <TeamsContext.Provider value={[teams, setTeams]}>
            {props.children}
        </TeamsContext.Provider>
    );

}