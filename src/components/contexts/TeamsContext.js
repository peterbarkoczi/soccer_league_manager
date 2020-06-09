import React, {useState, createContext} from "react";

export const TeamsContext = createContext();

export const TeamsProvider = props => {
    const [teams, setTeams] = useState([
        {
            team: 'Kiss Team',
            id: 1
        },
        {
            team: 'Kopacky',
            id: 2
        },
        {
            team: 'AC Calciopoli',
            id: 3
        },
        {
            team: 'Green-Go',
            id: 4
        },
        {
            team: 'Avengers',
            id: 5
        },
        {
            team: 'TÖFC',
            id: 6
        },
        {
            team: 'FociFenZ',
            id: 7
        },
        {
            team: 'Faláb Se',
            id: 8
        },
        {
            team: 'Dave Krokodiljai',
            id: 9
        },
        {
            team: 'Májer München',
            id: 10
        },{
            team: 'X-Taki',
            id: 11
        }
    ]);
    return (
        <TeamsContext.Provider value={[teams, setTeams]}>
            {props.children}
        </TeamsContext.Provider>
    );

}