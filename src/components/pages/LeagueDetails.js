import React, {useState, useContext, useEffect} from "react";

import styled from "styled-components";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const LeagueTable = styled.table`

    tr {
      text-align: center;
    }
    
    th {
      font-weight: bold;
    }
    
    tbody:nth-child(even) { 
      background-color: whitesmoke; 
    }
    
    a {
      color: black;
    }

`

const LeagueDetails = (props) => {
    const {teams, setTeams} = useContext(TeamsContext);
    const [isLoading, setIsLoading] = useState(false);
    let position = 1;

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:3000/teams?subLeague=${props.location.subLeagueName}`)
            .then((response) => setTeams(response.data))
            .then(() => setIsLoading(false));
    }, [props.location.subLeagueName, setTeams]);

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="leagueDetail">
                <h1 id="leagueDetailTitle">{props.location.subLeagueName}</h1>
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
                                    to={`/${localStorage.getItem("path")}/csapatok/${team.teamName.split(" ").join("")}`}>
                                    {team.teamName}
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