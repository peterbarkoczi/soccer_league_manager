import React, {useState, createContext} from "react";

export const MatchContext = createContext();

export const MatchProvider = props => {

    const [qualifierMatches, setQualifierMatches] = useState([]);
    const [sfIsReady, setSfIsReady] = useState(false)
    const [semiFinalMatches, setSemiFinalMatches] = useState([]);
    const [finalIsReady, setFinalIsReady] = useState(false)
    const [finalMatches, setFinalMatches] = useState([]);

    return (
        <MatchContext.Provider value={{
            qualifierMatches, setQualifierMatches,
            semiFinalMatches, setSemiFinalMatches,
            finalMatches, setFinalMatches,
            sfIsReady, setSfIsReady,
            finalIsReady, setFinalIsReady
        }}>
            {props.children}
        </MatchContext.Provider>
    )

}