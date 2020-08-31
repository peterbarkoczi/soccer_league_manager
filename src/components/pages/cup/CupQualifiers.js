import React, {useContext, useEffect} from "react";
import {MatchContext} from "../../contexts/MatchContext";
import {CupContext} from "../../contexts/CupContext";
import axios from "axios";
import DisplayMatches from "../../util/DisplayMatches";

const CupQualifiers = () => {

    const {
        cup, cupId,
        matchIsFinished,
        scoreIsAdded, setScoreIsAdded,
        cardIsAdded, setCardIsAdded
    } = useContext(CupContext);

    const {
        qualifierMatches, setQualifierMatches
    } = useContext(MatchContext);

    useEffect(() => {
        console.log("qualifierek betöltése");
        if (cupId !== "") {
            axios.get(`http://localhost:8080/match/get_qualifiers?cupId=${cupId}&matchType=q-1/4`)
                .then(response => setQualifierMatches(response.data))
                .then(() => setScoreIsAdded(false))
                .then(() => setCardIsAdded(false));
        }
    }, [cupId, scoreIsAdded, cardIsAdded, matchIsFinished]);

    return (
        <div>
            <h1 id="cupName">{cup.name}</h1>
            <h3 className="matchTypeTitle">Selejtező</h3>
            {qualifierMatches.map((match, index) => (
                <DisplayMatches key={match.id} match={match} index={++index} matchType={"Selejtező"}/>
            ))}
        </div>
    )
}

export default CupQualifiers;