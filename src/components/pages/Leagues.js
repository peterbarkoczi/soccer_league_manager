import React, {useState, useContext, useEffect} from "react";
import {LeagueContext} from "../contexts/LeagueContext";
import {Link} from "react-router-dom";
import axios from "axios";

function Leagues() {
    const {leagues, setLeagues} = useContext(LeagueContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showLeaguesDiv, setShowLeaguesDiv] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:3000/leagues")
            .then((response) => setLeagues(response.data))
            .then(() => setIsLoading(false));
    }, [setLeagues]);

    const LeaguesDiv = () => (
        <div className="leagues">
            <h1>Liga:</h1>
            <ul className="list" id="leaguesList">
                {leagues.map(league => (
                    <li className="team" key={league.name}>
                        <Link to={{
                            pathname: `liga/${league.name.split(" ").join("")}`,
                            id: league.id
                        }} onClick={() => setShowLeaguesDiv(false)}>{league.name}</Link>
                    </li>))
                }
            </ul>
        </div>
    )

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            showLeaguesDiv ? <LeaguesDiv/> : null
        )
    }
}

export default Leagues;