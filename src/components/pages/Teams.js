import React, {useContext} from "react";
import {TeamsContext} from "../contexts/TeamsContext";
import {Link} from "react-router-dom";
import AddTeamModal from "../modals/AddTeamModal";
import {SubLeaguesProvider} from "../contexts/SubLeagueContext";
import {ListGroup} from "react-bootstrap";

function Teams() {
    const {teams} = useContext(TeamsContext);

    return (
        <div className="teams">
            <h1 className="title" id="teamsTitle">
                Csapatok
            </h1>
            <SubLeaguesProvider>
                <div className="addTeam">
                    <AddTeamModal teams={teams}/>
                </div>
            </SubLeaguesProvider>
            <ListGroup variant="flush" className="list" id="teamsList">
                {teams.map(team => (
                    team.leagueId === parseInt(localStorage.getItem("leagueId")) ?
                        <ListGroup.Item className="team" key={team.id}>
                            <Link to={`csapatok/${team.teamName.split(" ").join("")}`}>{team.teamName}</Link>
                        </ListGroup.Item>
                        : null)
                )}
            </ListGroup>
        </div>
    );
}

export default Teams;