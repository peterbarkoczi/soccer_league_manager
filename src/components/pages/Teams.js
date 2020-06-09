import React, {useState, useContext} from "react";
import {TeamsContext} from "../contexts/TeamsContext";

function Teams() {
    const [teams, setTeams] = useContext(TeamsContext);

    return (
        <div className="teams">
            <h1 className="teamsTitle">
                Teams
            </h1>
            <ul className="teamsList">
                {teams.map(team => (<li className="team" key={team.id}>{team.team}</li> ))}
            </ul>
        </div>
    );
}

export default Teams;