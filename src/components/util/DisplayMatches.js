import React, {useContext, useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {CupContext} from "../contexts/CupContext";
import {AddCard, AddScorer} from "./SetMatchDetails";
import axios from "axios";

function DisplayMatches(props) {

    const {
        cup,
        matchIsFinished, setMatchIsFinished,
        matchId, setMatchId
    } = useContext(CupContext);

    const [team1Players, setTeam1Players] = useState([])
    const [team2Players, setTeam2Players] = useState([])

    const teams = [props.match.team1, props.match.team2];

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            try {
                if (!matchIsFinished) {
                    for (let i = 0; i < 2; i++) {
                        axios.get(`http://localhost:8080/player/listByName/${teams[i]}`)
                            .then(response => {
                                if (i === 0) {
                                    setTeam1Players(response.data);
                                } else {
                                    setTeam2Players(response.data);
                                }
                            });
                    }
                }
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
        if (matchIsFinished) {
            axios.post("http://localhost:8080/match/update_finished", {
                id: matchId
            })
                .then(() => setMatchIsFinished(false))
        }
    }, [matchIsFinished, setMatchIsFinished])

    const updateIsFinished = () => {
        setMatchIsFinished(true);
        setMatchId(props.match.id);
    }

    if (!team1Players || !team2Players) {
        return (<h1>Loading...</h1>);
    } else {
        return (
            <Table className="matchTable" striped bordered hover size="sm">
                <colgroup>
                    <col className="teamCell"/>
                    <col className="cardIconCell"/>
                    <col className="scoreCell"/>
                    <col className="scoreCell"/>
                    <col className="cardIconCell"/>
                    <col className="teamCell"/>
                </colgroup>
                <thead>
                <tr>
                    <th colSpan="6">{props.matchType + " - " + cup.date + " - " + props.match.time}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{props.match.team1}</td>
                    <td>
                        <AddCard
                            players={team1Players}
                            team={"team1"}
                            matchId={props.match.id}
                            isFinished={props.match.finished}
                            />
                    </td>
                    <td id={"score" + props.index}>
                        <Button id="increaseScore" variant="outline-secondary" size="sm">-</Button>{' '}
                        {props.match.score1}
                        {' '}<AddScorer
                        players={team1Players}
                        team={"team1"}
                        matchId={props.match.id}
                        score={props.match.score1}
                        isFinished={props.match.finished}/>
                    </td>
                    <td>
                        <Button id="increaseScore" variant="outline-secondary" size="sm">-</Button>{' '}
                        {props.match.score2}
                        {' '}<AddScorer
                        players={team2Players}
                        team={"team2"}
                        matchId={props.match.id}
                        score={props.match.score2}
                        isFinished={props.match.finished}/>
                    </td>
                    <td>
                        <AddCard
                            players={team2Players}
                            team={"team2"}
                            matchId={props.match.id}
                            isFinished={props.match.finished}/>
                    </td>
                    <td>{props.match.team2}</td>
                </tr>
                <tr>
                    <td id="scorer">{"Gólszerző:\n" + props.match.scorer1 + "\nLap:\n" + props.match.card1}</td>
                    <td colSpan="4">{}</td>
                    <td id="scorer">{"Gólszerző:\n" + props.match.scorer2 + "\nLap:\n" + props.match.card2}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="6"><Button
                        variant="outline-success"
                        onClick={updateIsFinished} size="sm"
                        disabled={props.match.finished}>VÉGE</Button></td>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

export default DisplayMatches;