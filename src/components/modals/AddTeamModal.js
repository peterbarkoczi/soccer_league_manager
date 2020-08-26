import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {DataPackContext} from "../contexts/DataPackContext";

function AddTeamModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const {setIsSelected} = useContext(DataPackContext);
    const [leagues, setLeagues] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [league, setLeague] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            try {
                axios.get(`http://localhost:8080/league/get_league_list/${localStorage.getItem("locationId")}`,
                    {cancelToken: source.token})
                    .then(response => setLeagues(response.data));
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cancelled");
                } else {
                    throw error;
                }
            }
        };

        loadData();
        return () => {source.cancel()}
    }, [])

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:8080/teams/add_team', {
                teamName: teamName,
                locationId: parseInt(localStorage.getItem("locationId")),
                leagueName: league
            })
                .then(response => console.log("team added" + response))
                .then(() => setIsAdded(false));
        }
        setIsSelected(true);
    }, [isAdded])

    const updateTeamName = e => {
        setTeamName(e.target.value);
    }

    const updateSubLeague = e => {
        setLeague(e.target.value);
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow} id="addTeamButton">
                Új csapat hozzáadása
            </Button>

            <Modal id="addNewTeam" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Új csapat hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addName">
                            <Form.Label>Csapat neve</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Új csapat"
                                value={teamName}
                                onChange={updateTeamName}/>
                        </Form.Group>
                        <Form.Group controlId="addLeague">
                            <Form.Label>Bajnokság</Form.Label>
                            <Form.Control as="select" onChange={updateSubLeague}>
                                <option defaultValue={"Válassz bajnokságot"}>Válassz bajnokságot</option>
                                {leagues.map(league => (
                                    <option
                                        key={league.name}
                                        value={league.name}>{league.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {
                            setIsAdded(true);
                            handleClose()
                        }} id="addTeamSubmit">
                            Add team
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