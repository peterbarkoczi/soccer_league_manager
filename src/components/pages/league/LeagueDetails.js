import React, {useState, useEffect, useContext} from "react";
import {DataPackContext} from "../../contexts/DataPackContext";
import axios from "axios";
import LeagueMatches from "./LeagueMatches";
import LeagueTable from "./LeagueTable";
import {MatchContext} from "../../contexts/MatchContext";
import {useParams} from "react-router-dom";
import {Button, ButtonGroup} from "@material-ui/core";
import styled from "styled-components";
import GroupTypeStats from "../../util/GroupTypeStats";

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

  .leagueTableContainer {
    margin-bottom: 2%;
  }
`;

const LeagueDetails = () => {

    const {setIsSelected} = useContext(DataPackContext);

    const {locationName, league} = useParams();

    const {matchIsFinished} = useContext(MatchContext);

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [showMatches, setShowMatches] = useState(false);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        setIsSelected(true);
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/match/getGroupStat`, {
            params: {
                locationName: locationName.split("_").join(" "),
                cupName: null,
                leagueName: league.split("_").join(" "),
                matchType: null
            }
        })
            .then(response => setTeams(response.data))
            .then(() => setIsLoading(false));
    }, [matchIsFinished])

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
                        <Button id="tableButton" onClick={() => setShowTable(!showTable)}
                                style={{background: showTable ? "green" : null, outline: "none"}}>Tabella</Button>
                        <Button id="matchesButton" onClick={() => setShowMatches(!showMatches)}
                                style={{background: showMatches ? "green" : null, outline: "none"}}>Meccsek</Button>
                        <Button id="statsButton" onClick={() => setShowStats(!showStats)}
                                style={{background: showStats ? "green" : null, outline: "none"}}>Statisztika</Button>
                    </ButtonGroup>
                    <div className="leagueTableContainer">
                        {showTable && <LeagueTable teams={teams}/>}
                    </div>
                    <div className="matchTableContainer">
                        {showMatches && <LeagueMatches/>}
                    </div>
                    <div className="statTablesContainer">
                        {showStats && <GroupTypeStats/>}
                    </div>
                </div>
            </LeagueDetailsStyle>
        )
    }
}
export default LeagueDetails;