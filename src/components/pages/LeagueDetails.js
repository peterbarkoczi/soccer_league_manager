import React, {useState, useEffect} from "react";

import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";


const LeagueDetails = () => {

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let position = 1;

    useEffect(() => {
        setIsLoading(true);
        setTeams(JSON.parse(localStorage.getItem("teams")));
        setIsLoading(false);
    }, [])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="leagueDetail">
                <h1 id="leagueDetailTitle">{localStorage.getItem("leagueName")}</h1>
                <Table responsive striped bordered hover variant="dark" id="leagueDetailTable">
                    <thead>
                    <tr>
                        <th>Helyezés</th>
                        <th>Csapat</th>
                        <th>Lejátszott meccs</th>
                        <th>Győzelem</th>
                        <th>Vereség</th>
                        <th>Rúgott gól</th>
                        <th>Kapott gól</th>
                        <th>Gólkülönbség</th>
                        <th>Pont</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teams.map(team => (
                        <tr>
                            <td>{position++}</td>
                            <td className="team">
                                <Link
                                    to={`/${localStorage.getItem("path")}/csapatok/${team.name.split(" ").join("")}`}>
                                    {team.name}
                                </Link>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }

}
export default LeagueDetails;