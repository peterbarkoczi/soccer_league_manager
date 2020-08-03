import React, {useContext, useEffect} from "react";
import QualifierForCup from "../../util/QualifierForCup";
import {CupContext} from "../../contexts/CupContext";

const CupDetails = () => {

    const {cup, matches, setMatches, isLoading} = useContext(CupContext);
    let index = 1;

    useEffect(() => {
        if (isLoading) {
            setMatches(cup.matches);
        }
    }, [cup, isLoading, setMatches])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div>
                <h1 id="cupName">{cup.name}</h1>
                {matches.map(match => (
                    <QualifierForCup key={"match" + match.id} match={match} index={index++}/>
                ))}
            </div>
        );
    }
}

export default CupDetails;