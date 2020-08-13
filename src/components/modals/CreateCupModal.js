import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal, ProgressBar} from "react-bootstrap";
import axios from "axios";
import {DataPackContext} from "../contexts/DataPackContext";

function CreateCupModal() {
    const [showCreateCupModal, setShowCreateCupModal] = useState(false);

    const handleClose = () => setShowCreateCupModal(false);
    const handleShow = () => setShowCreateCupModal(true);

    const {setIsSelected} = useContext(DataPackContext);
    const [teams, setTeams] = useState([]);
    const [cupName, setCupName] = useState("");
    const [numOfTeams, setNumOfTeams] = useState("8");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [matchTime, setMatchTime] = useState("");
    const [isAdded, setIsAdded] = useState(false);
    const [teamList, setTeamList] = useState([]);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/teams?id=${localStorage.getItem("locationId")}`)
            .then((response) => setTeams(response.data))
    }, []);

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:8080/cups/create_cup', {
                name: cupName,
                numOfTeams: numOfTeams,
                teamList: teamList,
                date: date,
                startTime: startTime,
                matchTime: matchTime,
                locationId: Number(localStorage.getItem("locationId")),
                matchType: "q"
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

    const updateMatchTime = e => {
        setMatchTime(e.target.value);
    }

    const updateCupName = e => {
        setCupName(e.target.value);
    }

    const updateNumOfTeams = e => {
        setNumOfTeams(e.target.value);
    }

    const deleteFromTeamList = team => {
        for (let i = 0; i < teamList.length; i++) {
            if (teamList[i] === team) {
                setTeamList(teamList => teamList.splice(i,1))
            }
        }
    }

    const menageTeams = e => {
        let team = e.target.value;
        let checked = e.target.checked;
        console.log(team);
        if (!teamList.includes(team) && teamList.length < Number(numOfTeams) && checked) {
            setTeamList(teamList => [...teamList, team]);
            setPercentage(percentage + (100/Number(numOfTeams)));
            console.log("add team");
        } else if (teamList.includes(team) && !checked) {
            deleteFromTeamList(team);
            setPercentage(percentage - (100/Number(numOfTeams)));
            console.log("delete team");
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
                            <Form.Control
                                type="number"
                                placeholder="Csapatok száma"
                                value={numOfTeams}
                                onChange={updateNumOfTeams}/>
                        </Form.Group>
                        <Form.Group>
                            {teams.map(team => (
                                <Form.Check type="checkbox">
                                    <Form.Check.Input
                                        type="checkbox"
                                        value={team.name}
                                        onChange={menageTeams} isValid/>
                                    <Form.Check.Label>{team.name}</Form.Check.Label>
                                </Form.Check>
                            ))}
                            <ProgressBar animated now={percentage} />
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
                        <Form.Group controlId="addCupMatchTime">
                            <Form.Label>Meccsek ideje(perc)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="20"
                                value={matchTime}
                                onChange={updateMatchTime}/>
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