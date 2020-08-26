import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {DataPackContext} from "../contexts/DataPackContext";

function CreateLeagueModal() {
    const [showLeagueModal, setShowLeagueModal] = useState(false);

    const handleClose = () => setShowLeagueModal(false);
    const handleShow = () => setShowLeagueModal(true);

    const {setIsSelected} = useContext(DataPackContext);
    const [leagueName, setLeagueName] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    const [teams, setTeams] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const list = [];


    useEffect(() => {
        axios.get(`http://localhost:8080/teams?id=${localStorage.getItem("locationId")}`)
            .then(response => setTeams(response.data))
    }, []);

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:8080/league/add_league', {
                name: leagueName,
                teams: teamList,
                locationId: Number(localStorage.getItem("locationId"))
            })
                .then(response => console.log("league added" + response))
                .then(() => setIsAdded(false))
        }
        setIsSelected(true);
    }, [isAdded])

    const updateLeagueName = e => {
        setLeagueName(e.target.value);
    }

    const updateTeamsList = () => {
        setTeamList(list);
    }

    const deleteFromTeamList = team => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === team) {
                list.splice(i,1)
            }
        }
    }

    const menageTeams = e => {
        let team = e.target.value;
        let checked = e.target.checked;
        if (!list.includes(team) && checked) {
            list.push(team);
        } else {
            deleteFromTeamList(team);
        }
        console.log(list);
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow} id="addLeagueButton">
                Új bajnokság hozzáadása
            </Button>

            <Modal id="addNewLeague" show={showLeagueModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Új bajnokság hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addLeagueName">
                            <Form.Label>Bajnokság neve</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Új bajnokság"
                                value={leagueName}
                                onChange={updateLeagueName}/>
                        </Form.Group>
                        <Form.Group>
                            {teams.map(team => (
                                <Form.Check type="checkbox" key={team.id}>
                                    <Form.Check.Input
                                        type="checkbox"
                                        value={team.name}
                                        onChange={menageTeams} isValid/>
                                    <Form.Check.Label>{team.name}</Form.Check.Label>
                                </Form.Check>
                            ))}
                        </Form.Group>
                        <Button variant="primary"  onClick={() => {
                            updateTeamsList();
                            setIsAdded(true);
                            handleClose();
                        }} id="addLeagueSubmit">
                            Bajnokság hozzáadása
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

export default CreateLeagueModal;