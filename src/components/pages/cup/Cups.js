import React, {useContext, useEffect, useState} from "react";
import CreateCupModal from "../../modals/CreateCupModal";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {DataPackContext} from "../../contexts/DataPackContext";
import {CupContext} from "../../contexts/CupContext";
import axios from "axios";

const Cups = () => {
    const {dataPack} = useContext(DataPackContext);
    const {setCupId} = useContext(CupContext);
    const [cups, setCups] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        localStorage.removeItem("cupId");
        axios.get("http://localhost:8080/cups/list")
            .then((response) => setCups(response.data))
        for (let location of dataPack) {
            if (location.id === Number(localStorage.getItem("locationId"))) {
                // setCups(location.cups);
                setTeams(location.teams);
            }
        }
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
                        }} onClick={() => {
                            setCupId(cup.id)
                        }}>{cup.name}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Cups;