import React, {useContext, useEffect} from "react";
import {MatchContext} from "../../contexts/MatchContext";
import {CupContext} from "../../contexts/CupContext";
import axios from "axios";
import DisplayMatches from "../../util/DisplayMatches";

const CupSemiFinals = () => {

    const {
        cupId,
        matchIsFinished,
        scoreIsAdded, setScoreIsAdded,
        cardIsAdded, setCardIsAdded
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
                    .then(response => setSemiFinalMatches(response.data))
                    .then(() => setSfIsReady(true))
                    .then(() => setSemiFinalsFinished(true));
            }
        }

    }, [qualifierMatches])

    return (
        <div>
            <h3 className="matchTypeTitle">Elődöntő</h3>
            {semiFinalMatches ?
                semiFinalMatches.map((match, index) => (
                    <DisplayMatches key={match.id} match={match} index={++index} matchType={"Elődöntő"}/>
                )) : null}
        </div>
    )

}

export default CupSemiFinals;