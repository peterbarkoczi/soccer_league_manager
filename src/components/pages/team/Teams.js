import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AddTeamModal from "../../modals/AddTeamModal";
import {ListGroup} from "react-bootstrap";
import axios from "axios";
import DeleteModal from "../../modals/DeleteModal";
import {DataPackContext} from "../../contexts/DataPackContext";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {teamIsDeleted} = useContext(DataPackContext);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/teams?id=${localStorage.getItem("locationId")}`)
            .then((response) => setTeams(response.data))
            .then(() => setIsLoading(false))
    }, [isAdded, teamIsDeleted]);

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="teams">
                <h1 className="title" id="teamsTitle">
                    Csapatok
                </h1>
                <div className="addTeam">
                    <AddTeamModal/>
                </div>
                <ListGroup variant="flush" className="list" id="teamsList">
                    {teams.map(team => (
                        <ListGroup.Item className="team" key={team.id}>
                            <Link to={{
                                pathname: `csapatok/${team.name.split(" ").join("")}`,
                                teamId: team.id,
                                teamName: team.name}}>{team.name}</Link>
                            {'   '}<DeleteModal id={team.id} url="teams"/>
                        </ListGroup.Item>)
                    )}
                </ListGroup>
            </div>
        );
    }
}

export default Teams;