import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const DataPackContext = createContext();

export const DataPackProvider = props => {
    const [dataPack, setDataPack] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [showLocationDiv, setShowLocationDiv] = useState(true);
    const [locationIsDeleted, setLocationIsDeleted] = useState(false);
    const [teamIsDeleted, setTeamIsDeleted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:8080/location/list")
            .then((response) => setDataPack(response.data))
            .then(() => setIsLoading(false));
    }, [setDataPack, locationIsDeleted, teamIsDeleted]);

    return (
        <DataPackContext.Provider value={{
            dataPack,
            isLoading, setIsLoading,
            isSelected, setIsSelected,
            showLocationDiv, setShowLocationDiv,
            locationIsDeleted, setLocationIsDeleted,
            teamIsDeleted, setTeamIsDeleted}}>
            {props.children}
        </DataPackContext.Provider>
    )
}