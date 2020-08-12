import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const CupContext = createContext();

export const CupProvider = props => {

    const [cup, setCup] = useState([]);
    const [matchId, setMatchId] = useState([]);
    const [qualifierMatches, setQualifierMatches] = useState([]);
    const [semiFinalMatches, setSemiFinalMatches] = useState([]);
    const [currentMatch, setCurrentMatch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [score1, setScore1] = useState("");
    const [score2, setScore2] = useState("");
    const [card1, setCard1] = useState("")
    const [card2, setCard2] = useState("")
    const [cupId, setCupId] = useState("");
    const [scoreIsAdded, setScoreIsAdded] = useState(false);
    const [cardIsAdded, setCardIsAdded] = useState(false);
    const [matchIsFinished, setMatchIsFinished] = useState(false);

    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (cupId !== "") {
            axios.get(`http://localhost:8080/cups/get_matches?cupId=${cupId}`)
                .then((response) => setCup(response.data))
                .then(() => setIsLoading(false))
                .then(() => setScoreIsAdded(false));
        }
    }, [cupId, scoreIsAdded, cardIsAdded]);

    return (
        <CupContext.Provider value={{
            isLoading, setIsLoading,
            cup, cupId, setCupId,
            matchId, setMatchId,
            qualifierMatches, setQualifierMatches,
            semiFinalMatches, setSemiFinalMatches,
            currentMatch, setCurrentMatch,
            score1, setScore1,
            score2, setScore2,
            card1, setCard1,
            card2, setCard2,
            scoreIsAdded, setScoreIsAdded,
            cardIsAdded, setCardIsAdded,
            matchIsFinished, setMatchIsFinished,
            isDeleted, setIsDeleted
        }}>
            {props.children}
        </CupContext.Provider>
    )
}