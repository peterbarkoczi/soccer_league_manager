import React, {useContext} from "react";
import {CupContext} from "../../contexts/CupContext";
import CupEliminationMatches from "./CupEliminationMatches";
import CupSemiFinals from "./CupSemiFinals";
import CupFinals from "./CupFinals";
import CupGroupMatches from "./CupGroupMatches";

const CupDetails = () => {

    const {cup} = useContext(CupContext);

    return (
        <div>
            <h1 id="cupName">{cup.name}</h1>
            {cup["qualifierType"] === "group" ?
                <CupGroupMatches/> :
                <CupEliminationMatches/>}
            <CupSemiFinals/>
            <CupFinals/>
        </div>
    );
}

export default CupDetails;