import React, {useContext, useEffect} from "react";
import {Button, Table} from "react-bootstrap";
import {CupContext} from "../contexts/CupContext";
import {AddScorer} from "./SetMatchDetails";
import axios from "axios";

function DisplayMatches(props) {

    const {
        cup,
        matchIsFinished, setMatchIsFinished,
        matchId, setMatchId} = useContext(CupContext);

    useEffect(() => {
        if (matchIsFinished) {
            axios.post("http://localhost:8080/match/update_finished", {
                id: matchId
            })
                .then(() => setMatchIsFinished(false))
        }
    }, [matchIsFinished,setMatchIsFinished])

    const updateIsFinished = () => {
        setMatchIsFinished(true);
        setMatchId(props.match.id);
    }

    return (
        <Table className="matchTable" striped bordered hover size="sm">
            <colgroup>
                <col className="teamCell"/>
                <col className="scoreCell"/>
                <col className="scoreCell"/>
                <col className="teamCell"/>
            </colgroup>
            <thead>
                <tr>
                    <th colSpan="4">{props.matchType + " - " + cup.date + " - " + props.match.time}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.match.team1}</td>
                    <td id={"score" + props.index}>
                        <Button id="increaseScore" variant="outline-secondary" size="sm">-</Button>{' '}
                        {props.match.score1}
                        {' '}<AddScorer
                        team={"team1"}
                        matchId={props.match.id}
                        score={props.match.score1}
                        isFinished={props.match.finished}/>
                    </td>
                    <td>
                        <Button id="increaseScore" variant="outline-secondary" size="sm">-</Button>{' '}
                        {props.match.score2}
                        {' '}<AddScorer
                        team={"team2"}
                        matchId={props.match.id}
                        score={props.match.score2}
                        isFinished={props.match.finished}/>
                    </td>
                    <td>{props.match.team2}</td>
                </tr>
                <tr>
                    <td id="scorer">{"Gólszerző:\n" + props.match.scorer1 + "\nLap:\n" + props.match.card1}</td>
                    <td colSpan="2">{}</td>
                    <td id="scorer">{"Gólszerző:\n" + props.match.scorer2 + "\nLap:\n" + props.match.card2}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4"><Button
                        variant="outline-success"
                        onClick={updateIsFinished} size="sm"
                        disabled={props.match.finished}>VÉGE</Button></td>
                </tr>
            </tfoot>
        </Table>
    )
}

export default DisplayMatches;