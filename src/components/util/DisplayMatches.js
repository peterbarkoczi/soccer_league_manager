import React, {useContext, useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {CupContext} from "../contexts/CupContext";
import {AddCard, AddScorer} from "./SetMatchDetails";
import axios from "axios";
import {MatchContext} from "../contexts/MatchContext";

function DisplayMatches(props) {

    const {
        matchId, setMatchId
    } = useContext(CupContext);

    const {
        matchIsFinished, setMatchIsFinished
    } = useContext(MatchContext);

    const [team1Players, setTeam1Players] = useState([])
    const [team2Players, setTeam2Players] = useState([])

    const [team1, setTeam1] = useState({})
    const [team2, setTeam2] = useState({})

    useEffect(() => {
        let teams = props.match.teams;
        if (teams[0]["name"] === props.match["team1"]) {
            setTeam1(props.match.teams[0]);
            setTeam2(props.match.teams[1]);
            setTeam1Players(props.match.teams[0].players);
            setTeam2Players(props.match.teams[1].players);
        } else {
            setTeam1(props.match.teams[1]);
            setTeam2(props.match.teams[0]);
            setTeam1Players(props.match.teams[1].players);
            setTeam2Players(props.match.teams[0].players);
        }
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

    return team1 === undefined && team2 === undefined ? (<h1>Loading...</h1>) : (
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
                <th colSpan="6">{`${props.matchType} - ${props.match.date} - ${props.match.time}`}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{team1.name}</td>
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
                <td>{team2.name}</td>
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
                    variant="light"
                    onClick={updateIsFinished} size="sm"
                    disabled={props.match.finished}>VÉGE</Button></td>
            </tr>
            </tfoot>
        </Table>
    );
}

export default DisplayMatches;