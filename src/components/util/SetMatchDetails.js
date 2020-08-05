import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {CupContext} from "../contexts/CupContext";
import axios from "axios";


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
            <Button variant="success" onClick={handleShow} disabled={props.isFinished}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Gólszerző</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Gólszerző</Form.Label>
                            <Form.Control as="textarea" rows="3" value={scorer} onChange={updateScorerName}/>
                        </Form.Group>
                    </Form>
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

export {AddScorer};