import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import CreateLeagueModal from "../../modals/CreateLeagueModal";
import axios from "axios";

const Leagues = () => {

    const [leagues, setLeagues] = useState([]);
    const [isTeamsCleared, setIsTeamsCleared] = useState(false);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        localStorage.removeItem("teamId");
        localStorage.removeItem("teamName");

        const loadData = () => {
            try {
                axios.get(`http://localhost:8080/league/get_league_list/${localStorage.getItem("locationId")}`,
                    {cancelToken: source.token})
                    .then(response => setLeagues(response.data));
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cancelled");
                } else {
                    throw error;
                }
            }
        };

        loadData();
        return () => {source.cancel()};
    }, [])

    function clearLocalStorage() {
        localStorage.removeItem("leagueId");
        localStorage.removeItem("leagueName");
        setIsTeamsCleared(true);
    }

    if (!isTeamsCleared) {
        clearLocalStorage();
    } else {
        return (
            <div className="leagues">
                <div className="title">
                    <h1 id="leagueTitle">Bajnokság</h1>
                </div>
                <div className="addLeague">
                    <CreateLeagueModal/>
                </div>
                <ListGroup className="list" id="leaguesList">
                    {leagues.map(league => (
                        <Link to={{
                            pathname: `/${localStorage.getItem("path")}/bajnoksag/${league.name.split(" ").join("")}`,
                        }} onClick={() => {
                            localStorage.setItem("leagueId", league.id);
                            localStorage.setItem("leagueName", league.name);
                        }}
                              className="league" key={league.name}>
                            <ListGroup.Item variant="dark">{league.name}</ListGroup.Item>
                        </Link>
                    ))
                    }
                </ListGroup>
            </div>
        )
    }
}

export default Leagues;