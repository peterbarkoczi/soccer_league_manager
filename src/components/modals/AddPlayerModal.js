import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {DataPackContext} from "../contexts/DataPackContext";
import {Button, Form, Modal} from "react-bootstrap";

const AddPlayerModal = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {setPlayerAdded} = useContext(DataPackContext);
    const [isAdded, setIsAdded] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [playerNumber, setPlayerNumber] = useState(0);
    const [birthDate, setBirthDate] = useState(new Date());
    let date;

    useEffect(() => {
        if (isAdded) {
            axios.post(`http://localhost:8080/player/add_player/${props.teamId}`, {
                name: playerName,
                number: playerNumber,
                birthDate: birthDate
            })
                .then(response => console.log("Player added: " + response.data))
                .then(() => setIsAdded(false))
                .then(() => setPlayerAdded(true));
        }
    }, [isAdded]);

    function updatePlayerName(e) {
        setPlayerName(e.target.value);
    }

    function updatePlayerNumber(e) {
        setPlayerNumber(e.target.value);
    }

    function updateBirthDate(e) {
        console.log(e.target.value);
        date = e.target.value;
        setBirthDate(new Date(date));
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow} id="addPlayerButton">
                Új játékos hozzáadása
            </Button>

            <Modal id="addNewPlayer" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Új csapat hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addPlayerName">
                            <Form.Label>Játékos neve</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Új játékos"
                                value={playerName}
                                onChange={updatePlayerName}/>
                        </Form.Group>
                        <Form.Group controlId="addPlayerBirthDate">
                            <Form.Label>Születési idő</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={updateBirthDate}/>
                        </Form.Group>
                        <Form.Group controlId="addPlayerNumber">
                            <Form.Label>Mezszám</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Mazszám"
                                value={playerNumber}
                                onChange={updatePlayerNumber}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {
                            setIsAdded(true);
                            handleClose()
                        }} id="addPlayerSubmit">
                            Játékos hozzáadása
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
    )
}

export default AddPlayerModal;