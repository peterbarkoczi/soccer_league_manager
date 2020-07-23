import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {DataPackContext} from "../contexts/DataPackContext";

function AddLeagueModal() {
    const [showLeagueModal, setShowLeagueModal] = useState(false);

    const handleClose = () => setShowLeagueModal(false);
    const handleShow = () => setShowLeagueModal(true);

    const {setIsSelected} = useContext(DataPackContext);
    const [leagueName, setLeagueName] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:8080/league/add_league', {
                name: leagueName,
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
                        <Form.Group controlId="addLeague">
                            <Form.Label>Bajnokság neve</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Új bajnokság"
                                value={leagueName}
                                onChange={updateLeagueName}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {
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

export default AddLeagueModal;