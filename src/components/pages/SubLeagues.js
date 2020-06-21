import React, {useState, useContext, useEffect} from "react";
import {LeagueContext} from "../contexts/LeagueContext";
import {Link} from "react-router-dom";
import axios from "axios";

const SubLeagues = (props) => {
    const {subLeagues, setSubLeagues} = useContext(LeagueContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(props)
        setIsLoading(true);
        axios.get(`http://localhost:3000/subLeagues?leagueId=${props.location.id}`)
            .then((response) => setSubLeagues(response.data))
            .then(() => setIsLoading(false));
    }, [props, setSubLeagues]);

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className="subLeagues">
                <div className="title">
                    <h1>Bajnokság</h1>
                </div>
                <ul className="list" id="subLeaguesList">
                    {subLeagues.map(subLeague => (
                        <li className="team" key={subLeague.name}>
                            <Link to={{
                                pathname: `/${localStorage.getItem("path")}/bajnoksag/${subLeague.name.split(" ").join("")}`,
                                subLeagueName: subLeague.name
                            }}>{subLeague.name}</Link>
                        </li>))
                    }
                </ul>
            </div>
        )
    }
}

export default SubLeagues;