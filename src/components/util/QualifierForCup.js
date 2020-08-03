import React, {useContext, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {CupContext} from "../contexts/CupContext";
import {AddScorer} from "./SetMatchDetails";

function QualifierForCup(props) {

    const {score1, setScore1, score2, setScore2, cup} = useContext(CupContext);
    const [isFinished, setIsFinished] = useState(false);

    function decreaseScore1() {
        if (score1 > 0) {
            setScore1(String(Number(score1) - 1));
        }
        console.log(score1);
    }

    function decreaseScore2() {
        if (score1 > 0) {
            setScore2(String(Number(score2) - 1));
        }
        console.log(score1);
    }

    const updateIsFinished = () => {
        setIsFinished(true);
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
                    <th colSpan="4">{"Selejtező - " + cup.date + " - " + props.match.time}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.match.team1}</td>
                    <td id={"score" + props.index}>
                        <Button id="increaseScore" variant="outline-secondary" size="sm" onClick={decreaseScore1}>-</Button>{' '}
                        {props.match.score1}
                        {' '}<AddScorer
                                team={"team1"}
                                matchId={props.match.id}
                                score={props.match.score1}
                                isFinished={isFinished}/>
                    </td>
                    <td>
                        <Button id="increaseScore" variant="outline-secondary" size="sm" onClick={decreaseScore2}>-</Button>{' '}
                        {props.match.score2}
                        {' '}<AddScorer
                                team={"team2"}
                                matchId={props.match.id}
                                score={props.match.score2}
                                isFinished={isFinished}/>
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
                    <td colSpan="4"><Button variant="outline-success" onClick={updateIsFinished} size="sm">VÉGE</Button></td>
                </tr>
            </tfoot>
        </Table>
    )
}

export default QualifierForCup;