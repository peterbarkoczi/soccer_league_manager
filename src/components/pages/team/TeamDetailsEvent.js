import React, {lazy, Suspense, useContext, useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import axios from "axios";
import AddPlayerModal from "../../modals/AddPlayerModal";
import {DataPackContext} from "../../contexts/DataPackContext";
import {Link, useParams} from "react-router-dom";

const usePrefetch = (factory) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
        factory();
        const comp = lazy(factory);
        setComponent(comp);
    }, [factory]);
    return component;
}

const importModal = () => import("../../modals/DeleteModal");

const TeamDetailsEvent = () => {

    const DeleteModal = usePrefetch(importModal);

    const {
        playerAdded, setPlayerAdded,
        setIsSelected,
        isShown, setIsShown,
        playerIsDeleted
    } = useContext(DataPackContext);
    const [playerList, setPlayerList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let index = 1;

    const [selectedId, setSelectedId] = useState(0);

    const {locationName, team, league} = useParams();

    useEffect(() => {
        setIsSelected(true);
        setIsLoading(true);
        axios.get(`http://localhost:8080/player/get_players_and_stats_by_team/${
            team.split("_").join(" ")}?locationName=${
            locationName.split("_").join(" ")}&leagueName=${
            league.split("_").join(" ")}`)
            .then((response) => {
                setPlayerList(response.data);
            })
            .then(() => setIsLoading(false))
            .then(() => setPlayerAdded(false));
    }, [playerAdded, playerIsDeleted])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div id="playerList">
                <h1>{league.split("_").join(" ")}</h1>
                <h3>{team.split("_").join(" ")}</h3>
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
                        <th>Sárga lap</th>
                        <th>Piros lap</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerList.map(player => (
                        <tr key={player["player"].id}>
                            <td>{index++}</td>
                            <td>{player["player"].number}</td>
                            <td id="playerName">
                                <Link to={{
                                    pathname: `/${locationName}/jatekos/${player["player"].name.split(" ").join("_")}`,
                                    hash: player["player"].id.toString()
                                }}
                                >
                                    {player["player"].name}
                                </Link>
                                {'   '}
                                <Button variant="warning" onClick={() => {
                                    setIsShown(true);
                                    setSelectedId(player.id)}}>
                                    Törlés
                                </Button>
                                <Suspense fallback={<h1>Loading...</h1>}>
                                    {isShown && selectedId === player["player"].id && <DeleteModal id={selectedId} name={player["player"].name} url="player"/>}
                                </Suspense>
                            </td>
                            <td>{player["goals"]}</td>
                            <td>{player["cards"]["Sárga"]}</td>
                            <td>{player["cards"]["Piros"]}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TeamDetailsEvent;