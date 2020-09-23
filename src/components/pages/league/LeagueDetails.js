import React, {useState, useEffect, useContext} from "react";
import {DataPackContext} from "../../contexts/DataPackContext";
import axios from "axios";
import LeagueMatches from "./LeagueMatches";
import LeagueTable from "./LeagueTable";
import {MatchContext} from "../../contexts/MatchContext";


const LeagueDetails = () => {

    const {setIsSelected} = useContext(DataPackContext);

    const {
        matchIsFinished,
        scoreIsAdded, setScoreIsAdded,
        cardIsAdded, setCardIsAdded
    } = useContext(MatchContext);

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        removeTeamsFromLocalStorage();
        setIsSelected(true);
        setIsLoading(true);
        axios.get(`http://localhost:8080/match/getGroupStat?cupId=&leagueId=${localStorage.getItem("leagueId")}`)
            .then(response => setTeams(response.data))
            .then(() => setIsLoading(false))
            .then(() => setScoreIsAdded(false))
            .then(() => setCardIsAdded(false));
    }, [matchIsFinished, scoreIsAdded, cardIsAdded])

    const removeTeamsFromLocalStorage = () => {
        localStorage.removeItem("teamId");
        localStorage.removeItem("teamName");
    }

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="leagueDetail">
                <LeagueTable teams={teams} />
                <LeagueMatches/>
            </div>
        )
    }

}
export default LeagueDetails;