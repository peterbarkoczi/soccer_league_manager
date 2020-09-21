import React, {useContext, useEffect} from "react";
import {MatchContext} from "../../contexts/MatchContext";
import {CupContext} from "../../contexts/CupContext";
import axios from "axios";
import DisplayMatches from "../../util/DisplayMatches";
import {showMatches} from "../../util/CSSFunctions";

const CupSemiFinals = () => {

    const {
        cupId,
        matchIsFinished,
        scoreIsAdded, setScoreIsAdded,
        cardIsAdded, setCardIsAdded,
        groupMatchesFinished
    } = useContext(CupContext);

    const {
        qualifierMatches,
        semiFinalMatches, setSemiFinalMatches,
        setSemiFinalsFinished,
        sfIsReady, setSfIsReady
    } = useContext(MatchContext);

    useEffect(() => {
        if (cupId !== "") {
            axios.get(`http://localhost:8080/match/get_matches?cupId=${cupId}&matchType=semiFinal`)
                .then(response => setSemiFinalMatches(response.data))
                .then(() => setScoreIsAdded(false))
                .then(() => setCardIsAdded(false));
        }
    }, [cupId, scoreIsAdded, cardIsAdded, matchIsFinished, sfIsReady])

    useEffect(() => {
        console.log("qulifierek csekkolása");
        if (qualifierMatches.length !== 0) {
            let counter = 0;
            for (let match of qualifierMatches) {
                if (match.finished === true && match.matchType === "qualifier-1/4") {
                    counter++;
                }
            }
            if (counter === 4 && semiFinalMatches.length === 0) {
                axios.get(`http://localhost:8080/match/create_semi_finals?cupId=${cupId}&matchType=semiFinal`)
                    .then(() => setSfIsReady(true))
                    .then(() => setSemiFinalsFinished(true));
            }
        } else if (groupMatchesFinished) {
            axios.get(`http://localhost:8080/match/create_semi_finals?cupId=${cupId}&matchType=semiFinal`)
                .then(() => setSfIsReady(true))
                .then(() => setSemiFinalsFinished(true));
        }

    }, [qualifierMatches, groupMatchesFinished])

    return (
        <div>
            <h3 className="matchTypeTitle" onClick={() => showMatches("semiFinalMatches")}>Elődöntő</h3>
            <div id="semiFinalMatches">
                {semiFinalMatches ?
                    semiFinalMatches.map((match, index) => (
                        <DisplayMatches key={match.id} match={match} index={++index} matchType={"Elődöntő"}/>
                    )) : null}
            </div>
        </div>
    )

}

export default CupSemiFinals;