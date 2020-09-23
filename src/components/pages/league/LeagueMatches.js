import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import DisplayMatches from "../../util/DisplayMatches";
import {MatchContext} from "../../contexts/MatchContext";

const LeagueMatches = () => {

    const {leagueMatchFinished} = useContext(MatchContext);
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();

        setIsLoading(true);
        axios.get(`http://localhost:8080/match/get_league_matches?leagueId=${localStorage.getItem("leagueId")}`,
            {cancelToken: source.token})
            .then((response) => setMatches(response.data))
            .then(() => setIsLoading(false));

        return () => {
            source.cancel("Component got unmounted");
        }
    }, [leagueMatchFinished])

    const setMatchType = (matchType) => (
        `${localStorage.getItem("leagueName")} - ${Number(matchType.slice(-2))}. foruló`
    )

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div>
                {matches.map((match, index) => (
                    <DisplayMatches key={match.id} match={match} index={++index} matchType={setMatchType(match.matchType)} />
                ))}
            </div>
        )
    }
}

export default LeagueMatches;