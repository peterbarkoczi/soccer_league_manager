import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";

function Leagues() {
    const {leagues, isLoading, setIsSelected, showLeaguesDiv, setShowLeaguesDiv} = useContext(LeagueContext);

    const LeaguesDiv = () => (
        <div className="leagues">
            <h1 id="leagueTitle">Liga:</h1>
            <ListGroup className="list" id="leaguesList">
                {leagues.map(league => (
                    <ListGroup.Item className="league" key={league.name}>
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
                    </ListGroup.Item>))
                }
            </ListGroup>
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