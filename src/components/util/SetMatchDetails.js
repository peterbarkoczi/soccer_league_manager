import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Image, Modal} from "react-bootstrap";
import {CupContext} from "../contexts/CupContext";
import axios from "axios";
import cardIcon from "../../yellow-red card icon.png";


function AddScorer(props) {

    const {setScoreIsAdded} = useContext(CupContext);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (isAdded) {
            let currentScore = setData();
            axios.post("http://localhost:8080/match/update_score",
                currentScore
            )
                .then(() => setScoreIsAdded(true))
                .then(() => setIsAdded(false))
        }
    }, [isAdded])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [scorer, setScorer] = useState("");

    function updateScorerName(e) {
        setScorer(e.target.value);
    }

    function setData() {
        let currentScore = {};
        currentScore.id = props.matchId;
        if (props.team === "team1") {
            currentScore.score1 = Number(props.score) + 1;
            currentScore.scorer1 = scorer;
        } else if (props.team === "team2") {
            currentScore.score2 = Number(props.score) + 1;
            currentScore.scorer2 = scorer;
        }
        return currentScore;
    }

    return (
        <>
            <Button variant="light" onClick={handleShow} disabled={props.isFinished}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Gólszerző</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Gólszerző</Form.Label>
                        <Form.Control as="select" multiple onChange={updateScorerName}>
                            {props.players.map(player => (
                                <option key={player.name} value={player.name} onClick={() => {
                                    handleClose();
                                    setData();
                                    setIsAdded(true);
                                }}>{player.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
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

function AddCard(props) {

    const {setCardIsAdded} = useContext(CupContext);
    const [isAdded, setIsAdded] = useState(false);
    let cardType = "";
    const [cardTypeState, setCardTypeState] = useState("");
    const [currentCard, setCurrentCard] = useState({
        id: 0,
        card1: "",
        card2: "",
        type: ""
    })

    useEffect(() => {
        if (isAdded) {
            let currentCard = setData();
            axios.post("http://localhost:8080/match/update_card",
                currentCard
            )
                .then(() => setCardIsAdded(true))
                .then(() => setIsAdded(false))
        }
    }, [isAdded])

    const [showCardModal, setShowCardModal] = useState(false);

    const handleClose = () => setShowCardModal(false);
    const handleShow = () => setShowCardModal(true);

    const [player, setPlayer] = useState("");

    function updatePlayerName(e) {
        setPlayer(e.target.value);
    }

    function setData() {
        if (props.team === "team1") {
            setCurrentCard({
                id: props.matchId,
                card1: player,
                card2: "",
                type: cardTypeState
            });
        } else if (props.team === "team2") {
            setCurrentCard({
                id: props.matchId,
                card1: "",
                card2: player,
                type: cardTypeState
            });
        }
        return currentCard;
    }

    function setCardType(e) {
        console.log(e.target.value);
        cardType = e.target.value;
        setCardTypeState(cardType);
    }

    return (
        <>
            <Image className="cardImage" id="cardImage1" src={cardIcon} onClick={!props.isFinished ? handleShow : null} thumbnail/>
            <Modal show={showCardModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Lap</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <fieldset>
                        <Form.Group>
                            <Form.Check
                                id="sarga"
                                label="Sárga"
                                type="checkbox"
                                value="Sárga"
                                onChange={setCardType}
                                isValid/>
                            <Form.Check
                                id="piros"
                                label="Piros"
                                type="checkbox"
                                value="Piros"
                                onChange={setCardType}
                                isValid/>
                        </Form.Group>
                    </fieldset>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Lapot kapja:</Form.Label>
                        <Form.Control as="select" multiple onChange={updatePlayerName}>
                            {props.players.map(player => (
                                <option key={player.name} value={player.name} onClick={() => {
                                    handleClose();
                                    setData();
                                    setIsAdded(true);
                                }}>{player.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose();
                        setData();
                        setIsAdded(true);
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export {AddScorer, AddCard};