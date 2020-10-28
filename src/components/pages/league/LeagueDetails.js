import React, {useState, useEffect, useContext} from "react";
import {DataPackContext} from "../../contexts/DataPackContext";
import axios from "axios";
import LeagueMatches from "./LeagueMatches";
import LeagueTable from "./LeagueTable";
import {MatchContext} from "../../contexts/MatchContext";
import {useParams} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const LeagueDetailsStyle = styled.div`

    #matchDetailsNavButtons {
        width: fit-content;
        display: flex;
        justify-content: center;
        background: white;
        color: black;
        margin-bottom: 2%;
    }
    
    .leagueTitle {
        color: white;
        display: flex;
        justify-content: center;
    }

`;

const LeagueDetails = () => {

    const {setIsSelected} = useContext(DataPackContext);

    const {locationName, league} = useParams();

    const {matchIsFinished} = useContext(MatchContext);

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showMatches, setShowMatches] = useState(false);

    useEffect(() => {
        setIsSelected(true);
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/match/getGroupStat?locationName=${locationName.split("_").join(" ")}&cupName=&leagueName=${league.split("_").join(" ")}&matchType=`)
            .then(response => setTeams(response.data))
            .then(() => setIsLoading(false));
    }, [matchIsFinished])

    const changeStatus = (state, fn) => {
        if (state === true) {
            fn(false);
        } else {
            fn(true);
        }
    }

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <LeagueDetailsStyle>
                <div className="leagueDetail">
                    <div className="leagueTitle">
                        <h1 id="leagueDetailTitle">{league.split("_").join(" ")}</h1>
                    </div>
                    <ButtonGroup size="large" aria-label="large outlined primary button group"
                                 id="matchDetailsNavButtons">
                        <Button onClick={() => {
                            // changeStatus(setShowMatches);
                            changeStatus(showTable, setShowTable);
                        }}>Tabella</Button>
                        <Button onClick={() => {
                            changeStatus(showMatches, setShowMatches);
                            // changeStatus(setShowTable);
                        }}>Meccsek</Button>
                        <Button>Góllövőlista</Button>
                    </ButtonGroup>

                    {showTable && <LeagueTable teams={teams}/>}
                    {showMatches && <LeagueMatches/>}
                </div>
            </LeagueDetailsStyle>
        )
    }

}
export default LeagueDetails;