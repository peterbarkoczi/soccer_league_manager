import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {TeamsContext} from "../contexts/TeamsContext";
import {SubLeaguesContext} from "../contexts/SubLeagueContext";

function AddTeamModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const {teams, setTeams} = useContext(TeamsContext);
    const {subLeagues} = useContext(SubLeaguesContext);
    const [isAdded, setIsAdded] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [subLeague, setSubLeague] = useState("");

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:3000/teams', {
                teamName: teamName,
                id: "",
                leagueId: parseInt(localStorage.getItem("leagueId")),
                subLeague: subLeague
            })
                .then(response => console.log("team added" + response))
                .then(() => setIsAdded(false));
        }
    }, [isAdded])

    const updateTeamName = e => {
        setTeamName(e.target.value);
    }

    const updateSubLeague = e => {
        setSubLeague(e.target.value);
    }

    function addTeam(e) {
        console.log("add team");
        e.preventDefault();
        setTeams(prevTeams => [...teams, {
            teamName: teamName,
            id: "",
            leagueId: parseInt(localStorage.getItem("leagueId")),
            subLeague: subLeague
        }]);
        setIsAdded(true);
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Új csapat hozzáadása
            </Button>

            <Modal id="addNewTeam" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Új csapat hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addTeam}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Csapat neve</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Új csapat"
                                value={teamName}
                                onChange={updateTeamName}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Bajnokság</Form.Label>
                            <Form.Control as="select" onChange={updateSubLeague}>
                                <option selected>Válassz bajnokságot</option>
                                {subLeagues.map(subLeague => (
                                    <option
                                        key={subLeague.name}
                                        value={subLeague.name}>{subLeague.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e) => {
                            addTeam(e);
                            handleClose()
                        }}>
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
    // }
}

export default AddTeamModal;