import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

function AddLocationModal() {
    const [showLocationModal, setShowLocationModal] = useState(false);

    const handleClose = () => setShowLocationModal(false);
    const handleShow = () => setShowLocationModal(true);

    const [locationName, setLocationName] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:8080/location/add_location', {
                name: locationName
            })
                .then(response => console.log("location added" + response))
                .then(() => setIsAdded(false))
        }
    }, [isAdded])

    const updateLocationName = e => {
        setLocationName(e.target.value);
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow} id="addTeamButton">
                Új helyszín hozzáadása
            </Button>

            <Modal id="addNewLocation" show={showLocationModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Új helyszín hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addName">
                            <Form.Label>Helyszín neve</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Új helyszín"
                                value={locationName}
                                onChange={updateLocationName}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {
                            setIsAdded(true);
                            console.log("isAdded: " + isAdded);
                            handleClose();
                        }} id="addTeamSubmit">
                            Add location
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
}

export default AddLocationModal;