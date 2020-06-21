import React, {useContext} from "react";
import {LeagueContext} from "../contexts/LeagueContext";
import {Link} from "react-router-dom";

function Leagues() {
    const {leagues, isLoading, setIsSelected, showLeaguesDiv, setShowLeaguesDiv} = useContext(LeagueContext);

    const LeaguesDiv = () => (
        <div className="leagues">
            <h1>Liga:</h1>
            <ul className="list" id="leaguesList">
                {leagues.map(league => (
                    <li className="team" key={league.name}>
                        <Link to={{
                            pathname: `liga/${league.name.split(" ").join("")}/bajnoksag`,
                            leagueId: league.id
                        }} onClick={() => {
                            setShowLeaguesDiv(false);
                            setIsSelected(true);
                            localStorage.setItem("leagueId", league.id);
                            localStorage.setItem("path", `liga/${league.name.split(" ").join("")}`);
                            localStorage.setItem("leagueName", league.name);
                        }}>{league.name}</Link>
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