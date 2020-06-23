import React, {useState, useContext, useEffect} from "react";
import {TeamsContext} from "../contexts/TeamsContext";
import axios from "axios";
import {Link} from "react-router-dom";
import AddTeamModal from "../modals/AddTeamModal";
import {SubLeaguesProvider} from "../contexts/SubLeagueContext";

function Teams() {
    const {teams, setTeams} = useContext(TeamsContext);
    // const [showAddTeam, setShowAddTeam] = useState(false);
    // const clickOnAddNewTeam = () => setShowAddTeam(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:3000/teams?leagueId=${localStorage.getItem("leagueId")}`)
            .then((response) => setTeams(response.data))
            .then(() => setIsLoading(false));
    }, [setTeams]);

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="teams">
                <h1 className="title" id="teamsTitle">
                    Csapatok
                </h1>
                <div className="addTeam">
                    <SubLeaguesProvider>
                        <AddTeamModal teams={teams}/>
                    </SubLeaguesProvider>
                </div>
                <ul className="list" id="teamsList">
                    {teams.map(team => (
                        <li className="team" key={team.id}>
                            <Link to={`csapatok/${team.teamName.split(" ").join("")}`}>{team.teamName}</Link>
                        </li>))
                    }
                </ul>
            </div>
        );
    }
}

export default Teams;