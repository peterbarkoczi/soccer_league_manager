import React, { useState, useContext } from "react";
import {TeamsContext} from "../contexts/TeamsContext";

function AddTeam() {
    const [teamName, setTeamName] = useState("");
    const [id, setId] = useState("");
    const [teams, setTeams] = useContext(TeamsContext);

    const updateTeamName = e => {
        setTeamName(e.target.value);
    }

    const updateId = e => {
        setId(e.target.value);
    }

    function addTeam(e) {
        e.preventDefault();
        setTeams(prevTeams => [...teams, {teamName: teamName, id: id }]);
    }

    return (
        <form id="addNewTeam" onSubmit={addTeam}>
            <input type="text" name="teamName" value={teamName} onChange={updateTeamName} />
            <input type="number" name="id" value={id} onChange={updateId} />
            <button>Submit</button>
        </form>
    )
}

export default AddTeam;