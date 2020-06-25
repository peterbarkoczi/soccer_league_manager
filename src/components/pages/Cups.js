import React, {useContext, useEffect} from "react";
import {CupsContext} from "../contexts/CupsContext";
import CreateCupModal from "../modals/CreateCupModal";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

const Cups = () => {
    const {cups, setCups} = useContext(CupsContext);

    useEffect(() => {
        axios.get(`http://localhost:3000/cups?leagueId=${localStorage.getItem("leagueId")}`)
            .then((response) => setCups(response.data));
    }, [setCups]);

    return (
        <div className="cups">
            <h1 id="cupsTitle">Kupák</h1>
            <CreateCupModal/>
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