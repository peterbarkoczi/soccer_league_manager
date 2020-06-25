import React, {useState, useContext, useEffect} from "react";
import {LeagueContext} from "../contexts/LeagueContext";
import {Link} from "react-router-dom";
import axios from "axios";
import {ListGroup} from "react-bootstrap";

const SubLeagues = () => {
    const {subLeagues, setSubLeagues} = useContext(LeagueContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:3000/subLeagues?leagueId=${localStorage.getItem("leagueId")}`)
            .then((response) => setSubLeagues(response.data))
            .then(() => setIsLoading(false));
    }, [setSubLeagues]);

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="subLeagues">
                <div className="title">
                    <h1 id="subLeagueTitle">Bajnokság</h1>
                </div>
                <ListGroup className="list" id="subLeaguesList">
                    {subLeagues.map(subLeague => (
                        <Link to={{
                            pathname: `/${localStorage.getItem("path")}/bajnoksag/${subLeague.name.split(" ").join("")}`,
                            subLeagueName: subLeague.name
                        }} className="subLeague">
                            <ListGroup.Item variant="dark" key={subLeague.name}>
                                {subLeague.name}</ListGroup.Item>
                            </Link>
                    ))
                    }
                </ListGroup>
            </div>
        )
    }
}

export default SubLeagues;