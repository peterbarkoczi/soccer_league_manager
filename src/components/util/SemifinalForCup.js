import React, {useContext, useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
// import {CupContext} from "../contexts/CupContext";

function SemifinalForCup(props) {

    // const {cupId} = useContext(CupContext);
    const [isLoading, setIsLoading] = useState(false);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        // if (cupId !== "") {
        axios.get(`http://localhost:8080/cups/get_semi_finals?cupId=${props.cup.id}`)
            // .then((response) => setMatches(response.data))
            .then((response) => console.log(response.data))
            .then(() => setIsLoading(false))
        // }
    }, [props.cup.id]);

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            matches.map(match => (
                <Table className="matchTable" striped bordered hover size="sm">
                    <colgroup>
                        <col className="teamCell"/>
                        <col className="scoreCell"/>
                        <col className="scoreCell"/>
                        <col className="teamCell"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th colSpan="4">{"Elődöntő - " + props.cup.date + " - " + match.time}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{match.team1}</td>
                        <td>{match.score1}</td>
                        <td>{match.score2}</td>
                        <td>{match.team2}</td>
                    </tr>
                    </tbody>
                </Table>
            ))
        )
    }
}

export default SemifinalForCup;