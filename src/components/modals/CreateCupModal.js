import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {DataPackContext} from "../contexts/DataPackContext";

function CreateCupModal(props) {
    const [showCreateCupModal, setShowCreateCupModal] = useState(false);

    const handleClose = () => setShowCreateCupModal(false);
    const handleShow = () => setShowCreateCupModal(true);

    const {setIsSelected} = useContext(DataPackContext);
    const [cupName, setCupName] = useState("");
    const [numOfTeams, setNumOfTeams] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [isAdded, setIsAdded] = useState(false);
    const [teamList, setTeamList] = useState([])
    let teams = [];

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:8080/cups/create_cup', {
                name: cupName,
                numOfTeams: numOfTeams,
                teamList: teamList,
                date: date,
                startTime: startTime,
                locationId: Number(localStorage.getItem("locationId"))
            })
                .then(response => console.log("league added" + response))
                .then(() => setIsAdded(false))
        }
        setIsSelected(true);
    }, [isAdded])

    const updateDate = e => {
        setDate(e.target.value);
    }

    const updateStartTime = e => {
        setStartTime(e.target.value);
    }

    const updateCupName = e => {
        setCupName(e.target.value);
    }

    const updateNumOfTeams = e => {
        setNumOfTeams(e.target.value);
        console.log(e.target.value);
    }

    const addTeamToCup = e => {
        if (!teams.includes(e.target.value)) {
            teams.push(e.target.value);
            console.log(e.target.value);
            console.log(teams.length);
        }
        if (teams.length === 8) {
            setTeamList(teams);
        }
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow} id="addCupButton">
                Új kupa létrehozása
            </Button>

            <Modal id="addNewCup" show={showCreateCupModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Új kupa létrehozása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addCupAddName">
                            <Form.Label>Bajnokság neve</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kupa neve"
                                value={cupName}
                                onChange={updateCupName}/>
                        </Form.Group>
                        <Form.Group controlId="addCupNumberOfTeams">
                            <Form.Label>Csapatok száma</Form.Label>
                            <Form.Control as="select" onChange={updateNumOfTeams}>
                                <option>Csapatok száma</option>
                                <option>8</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="addCupSelectLeague">
                            <Form.Label>Csapatok</Form.Label>
                            <Form.Control as="select" onChange={addTeamToCup} multiple>
                                {props.teams.map(team => (
                                    <option
                                        key={team.name}
                                        value={team.name}>{team.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="addCupDate">
                            <Form.Label>Dátum</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="2020.01.01"
                                value={date}
                                onChange={updateDate}/>
                        </Form.Group>
                        <Form.Group controlId="addCupStartTime">
                            <Form.Label>Kezdés</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="00:00"
                                value={startTime}
                                onChange={updateStartTime}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {
                            setIsAdded(true);
                            handleClose();
                        }} id="addCupSubmit">
                            Kupa létrehozása
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Bezár
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateCupModal;