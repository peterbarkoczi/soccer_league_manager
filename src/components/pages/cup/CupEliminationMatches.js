import React, {useContext, useEffect} from "react";
import {MatchContext} from "../../contexts/MatchContext";
import {CupContext} from "../../contexts/CupContext";
import axios from "axios";
import DisplayMatches from "../../util/DisplayMatches";

const CupEliminationMatches = () => {

    const {
        cupId,
    } = useContext(CupContext);

    const {
        qualifierMatches, setQualifierMatches,
        matchIsFinished,
        scoreIsAdded, setScoreIsAdded,
        cardIsAdded, setCardIsAdded
    } = useContext(MatchContext);

    const checkFinish = (list) => {
        if (list) {
            let type = "";
            let isFinishedAll;

            for (const match of list) {
                if (match.finished) {
                    if (type !== match.matchType) {
                        isFinishedAll = true;
                        type = match.matchType;
                    }
                } else {
                    isFinishedAll = false;
                    break;
                }
            }
            if (isFinishedAll && type !== "qualifier-1/4") {
                let matches = list;
                axios.get(`http://localhost:8080/match/create_qualifiers_next_round?cupId=${cupId}&matchType=${type}`)
                    .then(response => {
                        if (response.data !== "") {
                            setQualifierMatches(matches.concat(response.data))
                        }
                    });
            }
        }
    }

    useEffect(() => {
        if (cupId !== "") {
            axios.get(`http://localhost:8080/match/get_matches?cupId=${cupId}&matchType=qualifier`)
                .then((response) => setQualifierMatches(response.data))
                .then(() => setScoreIsAdded(false))
                .then(() => setCardIsAdded(false));
        }
    }, [scoreIsAdded, cardIsAdded, matchIsFinished]);

    useEffect(() => {
        checkFinish(qualifierMatches)
    }, [qualifierMatches])

    return (
        <div>
            <h3 className="matchTypeTitle">Selejtező</h3>
            {qualifierMatches.map((match, index) => (
                <DisplayMatches key={match.id + index++} match={match} index={++index} matchType={"Selejtező"}/>
            ))}
        </div>
    )
}

export default CupEliminationMatches;