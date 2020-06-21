import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const LeagueContext = createContext();

export const LeagueProvider = props => {
    const [leagues, setLeagues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [subLeagues, setSubLeagues] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [showLeaguesDiv, setShowLeaguesDiv] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:3000/leagues")
            .then((response) => setLeagues(response.data))
            .then(() => setIsLoading(false));
    }, [setLeagues]);

    return (
        <LeagueContext.Provider value={{
            leagues, setLeagues,
            isLoading,
            subLeagues, setSubLeagues,
            isSelected, setIsSelected,
            showLeaguesDiv, setShowLeaguesDiv}}>
            {props.children}
        </LeagueContext.Provider>
    )
}