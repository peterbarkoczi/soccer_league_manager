import React, {useState, useEffect, useContext} from "react";
import {DataPackContext} from "../../contexts/DataPackContext";
import axios from "axios";
import LeagueMatches from "./LeagueMatches";
import LeagueTable from "./LeagueTable";
import {MatchContext} from "../../contexts/MatchContext";
import {useParams} from "react-router-dom";


const LeagueDetails = () => {

    const {setIsSelected} = useContext(DataPackContext);

    const {locationName, league} = useParams();

    const {matchIsFinished} = useContext(MatchContext);

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsSelected(true);
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/match/getGroupStat?locationName=${locationName.split("_").join(" ")}&cupName=&leagueName=${league.split("_").join(" ")}&matchType=`)
            .then(response => setTeams(response.data))
            .then(() => setIsLoading(false));
    }, [matchIsFinished])

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