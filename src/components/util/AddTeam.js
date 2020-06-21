import React, {useState, useContext, useEffect} from "react";
import {TeamsContext} from "../contexts/TeamsContext";
import axios from "axios";

function AddTeam() {
    const [teamName, setTeamName] = useState("");
    const [id, setId] = useState("");
    const [isAdded, setIsAdded] = useState(false);
    const {teams, setTeams} = useContext(TeamsContext);

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:3000/teams', {teamName: teamName, id: parseInt(id), leagueId: parseInt(localStorage.getItem("leagueId"))})
                .then(response => console.log("team added" + response))
                .then(() => setIsAdded(false));
        }
    }, [isAdded])

    const updateTeamName = e => {
        setTeamName(e.target.value);
    }

    const updateId = e => {
        setId(e.target.value);
    }

    function addTeam(e) {
        e.preventDefault();
        setTeams(prevTeams => [...teams, {teamName: teamName, id: parseInt(id), leagueId: parseInt(localStorage.getItem("leagueId"))}]);
        setIsAdded(true);
    }

    return (
        <form id="addNewTeam" onSubmit={addTeam}>
            <input type="text" name="teamName" value={teamName} onChange={updateTeamName}/>
            <input type="number" name="id" value={id} onChange={updateId}/>
            <button>Submit</button>
        </form>
    )
}

export default AddTeam;