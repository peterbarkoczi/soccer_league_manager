import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AddTeamModal from "../modals/AddTeamModal";
import {ListGroup} from "react-bootstrap";
import axios from "axios";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/teams?id=${localStorage.getItem("locationId")}`)
            .then((response) => setTeams(response.data))
            .then(() => setIsLoading(false))
    }, [isAdded]);

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="teams">
                <h1 className="title" id="teamsTitle">
                    Csapatok
                </h1>
                <div className="addTeam">
                    <AddTeamModal isAdded={isAdded} setIsAdded={setIsAdded}/>
                </div>
                <ListGroup variant="flush" className="list" id="teamsList">
                    {teams.map(team => (
                        <ListGroup.Item className="team" key={team.id}>
                            <Link to={`csapatok/${team.name.split(" ").join("")}`}>{team.name}</Link>
                        </ListGroup.Item>)
                    )}
                </ListGroup>
            </div>
        );
    }
}

export default Teams;