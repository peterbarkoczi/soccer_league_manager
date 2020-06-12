import React, {useState, useContext} from "react";
import {LeagueContext} from "../contexts/LeagueContext";
import {Link} from "react-router-dom";

function SubLeagues() {
    const {subLeaguesList} = useContext(LeagueContext);
    const [subLeagues, setSubLeague] = subLeaguesList;

    return (
        <div className="subLeagues">
            <h1>Bajnokság</h1>
            <ul className="list" id="subLeaguesList">
                {subLeagues.map(subLeague => (
                    <li className="team" key={subLeague.name}>
                        <Link to={`/${subLeague.name.split(" ").join("")}`}>{subLeague.name}</Link>
                    </li>))
                }
            </ul>
        </div>
    )

}

export default SubLeagues;