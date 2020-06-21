import React, {useState, useContext, useEffect} from "react";
import {TeamsContext} from "../contexts/TeamsContext";
import axios from "axios";
import styled from "styled-components";
import {Link} from "react-router-dom";

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
                <h1>{props.location.subLeagueName}</h1>
                <LeagueTable id="leagueTable">
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
                    {teams.map(team => (
                        <tbody>
                            <tr>
                                <td>{position++}</td>
                                <td><Link to={`/${localStorage.getItem("path")}/csapatok/${team.teamName.split(" ").join("")}`}>{team.teamName}</Link></td>
                            </tr>
                        </tbody>
                    ))}
                </LeagueTable>
            </div>
        )
    }

}
export default LeagueDetails;