import React, {useContext, useEffect, useState} from "react";
import CreateCupModal from "../../modals/CreateCupModal";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {DataPackContext} from "../contexts/DataPackContext";

const Cups = () => {
    const {dataPack} = useContext(DataPackContext);
    const [cups, setCups] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        dataPack.forEach(location => {
            if (location.id === Number(localStorage.getItem("locationId"))) {
                setCups(location.cups);
                setTeams(location.teams);
            }
        });
    }, [dataPack]);

    return (
        <div className="cups">
            <h1 id="cupsTitle">Kupák</h1>
            <CreateCupModal teams={teams}/>
            <ListGroup id="cupsList">
                {cups.map(cup => (
                    <ListGroup.Item key={cup.name}>
                        <Link to={{
                            pathname: `/${localStorage.getItem("path")}/kupak/${cup.name.split(" ").join("")}`,
                            cup: cup
                        }}>{cup.name}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Cups;