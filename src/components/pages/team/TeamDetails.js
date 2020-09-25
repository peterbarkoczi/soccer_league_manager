import React, {useContext, useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import AddPlayerModal from "../../modals/AddPlayerModal";
import {DataPackContext} from "../../contexts/DataPackContext";
import {useParams} from "react-router-dom";

const TeamDetails = () => {

    const {playerAdded, setPlayerAdded, setIsSelected} = useContext(DataPackContext);
    const [playerList, setPlayerList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let index = 1;

    const {locationName, team} = useParams();

    useEffect(() => {
        setIsSelected(true);
        setIsLoading(true);
        axios.get(`http://localhost:8080/player/listByName/${team.split("_").join(" ")}`)
            .then(response => setPlayerList(response.data))
            .then(() => setIsLoading(false))
            .then(() => setPlayerAdded(false));
    }, [playerAdded])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div id="playerList">
                <h1>{team.split("_").join(" ")}</h1>
                <AddPlayerModal locationName={locationName} team={team}/>
                <Table id="playersTable" striped bordered hover size="sm">
                    <colgroup>
                        <col className="playerIndexCell"/>
                        <col className="playerNumberCell"/>
                        <col className="playerNameCell"/>
                        <col className="playerGoalsCell"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Mezszám</th>
                        <th>Név</th>
                        <th>Gólok</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerList.map(player => (
                        <tr key={player.id}>
                            <td>{index++}</td>
                            <td>{player.number}</td>
                            <td id="playerName">{player.name}</td>
                            <td>{player.goals}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TeamDetails;