import React, {useContext, useEffect, useState} from "react";
import DisplayMatches from "../../util/DisplayMatches";
import {CupContext} from "../../contexts/CupContext";
import axios from "axios";
import CupQualifiers from "./CupQualifiers";
import {MatchContext} from "../../contexts/MatchContext";

const CupDetails = () => {

    const {
        cup, cupId,
        matchIsFinished,
        scoreIsAdded, setScoreIsAdded,
        cardIsAdded, setCardIsAdded
    } = useContext(CupContext);

    const {
        qualifierMatches, setQualifierMatches
    } = useContext(MatchContext);

    // const [qualifierMatches, setQualifierMatches] = useState([]);
    const [sfIsReady, setSfIsReady] = useState(false)
    const [semiFinalMatches, setSemiFinalMatches] = useState([]);
    const [finalIsReady, setFinalIsReady] = useState(false)
    const [finalMatches, setFinalMatches] = useState([]);

    let finalTitles = ["Bronz meccs", "Döntő"];
    let titleIndex = 0;

    let index = 1;

    useEffect(() => {
        console.log("qulifierek csekkolása");
        console.log(qualifierMatches);
        if (qualifierMatches.length !== 0) {
            let counter = 0;
            for (let match of qualifierMatches) {
                if (match.finished === true) {
                    counter++;
                }
            }
            if (counter === qualifierMatches.length && semiFinalMatches.length === 0) {
                axios.get(`http://localhost:8080/match/create_semi_finals?cupId=${cupId}&matchType=semiFinal`)
                    .then(response => setSemiFinalMatches(response.data))
                    .then(() => setSfIsReady(true));
            }
        }
    }, [qualifierMatches, matchIsFinished])

    useEffect(() => {
        if (cupId !== "") {
            axios.get(`http://localhost:8080/match/get_semifinals?cupId=${cupId}&matchType=semiFinal`)
                .then(response => setSemiFinalMatches(response.data))
                .then(() => setScoreIsAdded(false))
                .then(() => setCardIsAdded(false));
        }
    }, [cupId, scoreIsAdded, cardIsAdded, matchIsFinished, sfIsReady])

    useEffect(() => {
        if (semiFinalMatches.length !== 0) {
            let counter = 0;
            for (let match of semiFinalMatches) {
                if (match.finished === true) {
                    counter++;
                }
            }
            if (counter === semiFinalMatches.length && finalMatches.length === 0) {
                axios.get(`http://localhost:8080/match/create_semi_finals?cupId=${cupId}&matchType=final`)
                    .then(response => setFinalMatches(response.data))
                    .then(() => setFinalIsReady(true));
            }
        }
    }, [qualifierMatches])

    useEffect(() => {
        // setIsLoading(true);
        if (cupId !== "") {
            axios.get(`http://localhost:8080/match/get_semifinals?cupId=${cupId}&matchType=final`)
                .then(response => setFinalMatches(response.data))
                .then(() => setScoreIsAdded(false))
                .then(() => setCardIsAdded(false));
        }
    }, [cupId, scoreIsAdded, cardIsAdded, matchIsFinished, finalIsReady])


    return (
        <div>
            <CupQualifiers/>
            {/*<h1 id="cupName">{cup.name}</h1>*/}
            {/*<h3 className="matchTypeTitle">Selejtező</h3>*/}
            {/*{qualifierMatches.map(match => (*/}
            {/*    <DisplayMatches key={match.id} match={match} index={index++} matchType={"Selejtező"}/>*/}
            {/*))}*/}

            <h3 className="matchTypeTitle">Elődöntő</h3>
            {semiFinalMatches ?
                semiFinalMatches.map(match => (
                    <DisplayMatches key={match.id} match={match} index={index++} matchType={"Elődöntő"}/>
                )) : null}

            <h3 className="matchTypeTitle">Döntő</h3>
            {finalMatches ?
                finalMatches.map(match => (
                    <DisplayMatches key={match.id} match={match} index={index++} matchType={finalTitles[titleIndex++]}/>
                )) : null}

        </div>
    );
}

export default CupDetails;