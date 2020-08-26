import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import {DataPackContext} from "../../contexts/DataPackContext";
import axios from "axios";


const LeagueDetails = () => {

    const {setIsSelected} = useContext(DataPackContext);

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let position = 1;

    useEffect(() => {
        removeTeamsFromLocalStorage();
        setIsSelected(true);
        setIsLoading(true);
        axios.get(`http://localhost:8080/teams/${localStorage.getItem("leagueId")}`)
            .then(response => setTeams(response.data))
            .then(() => setIsLoading(false));
    }, [])

    const removeTeamsFromLocalStorage = () => {
        localStorage.removeItem("teamId");
        localStorage.removeItem("teamName");
    }

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
                                    to={{
                                        pathname: `/${localStorage.getItem("path")}/csapatok/${team.name.split(" ").join("")}`}}
                                    onClick={() => {
                                        localStorage.setItem("teamId", team.id);
                                        localStorage.setItem("teamName", team.name);
                                    }}>
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