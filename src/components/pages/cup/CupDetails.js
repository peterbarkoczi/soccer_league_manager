import React, {useContext} from "react";
import {CupContext} from "../../contexts/CupContext";
import CupQualifiers from "./CupQualifiers";
import CupSemiFinals from "./CupSemiFinals";
import CupFinals from "./CupFinals";

const CupDetails = () => {

    const {cup} = useContext(CupContext);

    return (
        <div>
            <h1 id="cupName">{cup.name}</h1>
            <CupQualifiers/>
            <CupSemiFinals/>
            <CupFinals/>
        </div>
    );
}

export default CupDetails;