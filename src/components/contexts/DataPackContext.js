import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const DataPackContext = createContext();

export const DataPackProvider = props => {
    const [dataPack, setDataPack] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [showLocationDiv, setShowLocationDiv] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:8080/liga/list")
            .then((response) => setDataPack(response.data))
            .then(() => setIsLoading(false));
    }, [setDataPack]);

    return (
        <DataPackContext.Provider value={{
            dataPack,
            isLoading, setIsLoading,
            isSelected, setIsSelected,
            showLocationDiv, setShowLocationDiv}}>
            {props.children}
        </DataPackContext.Provider>
    )
}