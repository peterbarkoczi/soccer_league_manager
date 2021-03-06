import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {DataPackContext} from "../contexts/DataPackContext";
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";

const AddPlayerModal = (props) => {

    const {register, handleSubmit, errors} = useForm({reValidateMode: "onBlur"});
    const onSubmit = (data) => {
        console.log(numbers);
        console.log(data);
        setIsAdded(true);
        handleClose();
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {setPlayerAdded} = useContext(DataPackContext);
    const [isAdded, setIsAdded] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [position, setPosition] = useState("");
    const [foot, setFoot] = useState("");
    const [playerNumber, setPlayerNumber] = useState(0);
    const [birthDate, setBirthDate] = useState("");

    const [numbers, setNumbers] = useState([]);
    let tempBirthDate;

    useEffect(() => {
        let temp = [];
        props.players.filter(player => temp.push(player.number))
        setNumbers(temp);
    }, [])

    useEffect(() => {
        if (isAdded) {
            axios.post(`${process.env.REACT_APP_API_URL}/player/add_player/${props.locationName.split("_").join(" ")}-${props.team.split("_").join(" ")}`,
                {
                    name: playerName,
                    number: playerNumber,
                    birthDate: birthDate,
                    position: position,
                    foot: foot
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

    function updatePosition(e) {
        setPosition(e.target.value);
    }

    function updateFoot(e) {
        setFoot(e.target.value);
    }

    function updateBirthDate(e) {
        console.log(e.target.value);
        tempBirthDate = e.target.value;
        setBirthDate(tempBirthDate);
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow} className="addButton" id="addPlayerButton">
                Új játékos hozzáadása
            </Button>

            <Modal id="addNewPlayer" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Új csapat hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="addPlayerName">
                            <Form.Label>Játékos neve</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Új játékos"
                                value={playerName}
                                onChange={updatePlayerName}/>
                        </Form.Group>
                        <Form.Group controlId="addPlayerBirthDate">
                            <Form.Label>Születési idő</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                value={tempBirthDate}
                                onChange={updateBirthDate}/>
                        </Form.Group>
                        <Form.Group controlId="addPlayerNumber">
                            <Form.Label>Mezszám</Form.Label>
                            <Form.Control
                                required
                                style={{border: `3px solid ${numbers.includes(Number(playerNumber)) ? "red" : "green"}`}}
                                type="number"
                                placeholder="Mezszám"
                                name="playerNumber"
                                ref={register({required: true, validate: data => !numbers.includes(Number(data))})}
                                value={playerNumber}
                                onChange={updatePlayerNumber}/>
                        </Form.Group>
                        {errors.playerNumber && errors.playerNumber.type === "validate" &&
                        <p className="error">Válassz másik számot</p>}
                        <Form.Group controlId="addPlayerPosition">
                            <Form.Label>Pozíció</Form.Label>
                            <Form.Control as="select" onChange={updatePosition}>
                                <option label="Válassz az alábbiak közül"/>
                                <option key="kapus" value="kapus" label="kapus"/>
                                <option key="hátvéd" value="hátvéd" label="hátvéd"/>
                                <option key="középpályás" value="középpályás" label="középpályás"/>
                                <option key="csatár" value="csatár" label="csatár"/>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="addPlayerFoot">
                            <Form.Label>Ügyesebb láb</Form.Label>
                            <Form.Control as="select" onChange={updateFoot}>
                                <option label="Válassz az alábbiak közül"/>
                                <option key="jobb" value="jobb" label="jobb"/>
                                <option key="bal" value="bal" label="bal"/>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="success" type="submit" id="addPlayerSubmit">
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