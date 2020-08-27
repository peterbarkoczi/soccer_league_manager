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
    const selectedTeams = [];
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [matchTime, setMatchTime] = useState("");
    const [gameDays, setGameDays] = useState([]);
    const selectedDays = [];
    const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];


    useEffect(() => {
        axios.get(`http://localhost:8080/teams?id=${localStorage.getItem("locationId")}`)
            .then(response => setTeams(response.data))
    }, []);

    useEffect(() => {
        if (isAdded) {
            axios.post('http://localhost:8080/league/create_league', {
                name: leagueName,
                teams: teamList,
                date: date,
                startTime: startTime,
                gameDays: gameDays,
                matchTime: matchTime,
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

    const updateDate = e => {
        setDate(e.target.value);
    }

    const updateStartTime = e => {
        setStartTime(e.target.value);
    }

    const updateMatchTime = e => {
        setMatchTime(e.target.value);
    }

    const menageDays = e => {
        menageList(e, selectedDays)
    }

    const updateLists = () => {
        setTeamList(selectedTeams);
        setGameDays(selectedDays);
    }

    const deleteFromList = (list, item) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === item) {
                list.splice(i,1)
            }
        }
    }

    const menageTeams = e => {
        menageList(e, selectedTeams);
    }

    const menageList = (e, list) => {
        let item = e.target.value;
        let checked = e.target.checked;
        if (!list.includes(item) && checked) {
            list.push(item);
        } else {
            deleteFromList(list, item);
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
                        <Form.Group controlId="addLeagueDate">
                            <Form.Label>Dátum</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="2020.01.01"
                                value={date}
                                onChange={updateDate}/>
                        </Form.Group>
                        <Form.Group controlId="addLeagueStartTime">
                            <Form.Label>Kezdés</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="00:00"
                                value={startTime}
                                onChange={updateStartTime}/>
                        </Form.Group>
                        <Form.Group controlId="addLeagueMatchTime">
                            <Form.Label>Meccsek ideje(perc)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="20"
                                value={matchTime}
                                onChange={updateMatchTime}/>
                        </Form.Group>
                        <Form.Group>
                            {days.map(day => (
                                <Form.Check type="checkbox" key={day} inline>
                                    <Form.Check.Input
                                        type="checkbox"
                                        value={day}
                                        onChange={menageDays} isValid/>
                                    <Form.Check.Label>{day}</Form.Check.Label>
                                </Form.Check>
                            ))}
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
                            updateLists();
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