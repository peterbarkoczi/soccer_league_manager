import React, {useState, useContext} from "react";
import {LeagueContext} from "../contexts/LeagueContext";
import {Link} from "react-router-dom";

function Leagues() {
    const {leagues, setLeagues} = useContext(LeagueContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showLeaguesDiv, setShowLeaguesDiv] = useState(true);

    return (
        <div className="leagues">
            <h1>Liga</h1>
            <ul className="list" id="leaguesList">
                {leagues.map(league => (
                    <li className="team" key={league.name}>
                        <Link to={`bajnoksag/${league.name.split(" ").join("")}`}>{league.name}</Link>
                    </li>))
                }
            </ul>
        </div>

    )
}

export default Leagues;