import React, {useState, useContext} from "react";
import {TeamsContext} from "../contexts/TeamsContext";
import AddTeam from "../util/AddTeam"

function Teams() {
    const [teams, setTeams] = useContext(TeamsContext);
    const [showAddTeam, setShowAddTeam] = useState(false);
    const clickOnAddNewTeam = () => setShowAddTeam(true);

    return (
        <div className="teams">
            <h1 className="title" id="teamsTitle">
                Csapatok
            </h1>
            <div className="addTeam">
                <input id="addNewTeamButton" type="submit" value="Új csapat hozzáadása" onClick={clickOnAddNewTeam}/>
                { showAddTeam ? <AddTeam /> : null }
            </div>
            <ul className="list" id="teamsList">
                {teams.map(team => (
                    <li className="team" key={team.id}>
                        <a href={`csapatok/${team.teamName.split(" ").join("")}`}>{team.teamName}</a>
                    </li>))
                }
            </ul>
        </div>
    );
}

export default Teams;