import React, {useState, createContext} from "react";

export const DataPackContext = createContext();

export const DataPackProvider = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [showLocationDiv, setShowLocationDiv] = useState(true);
    const [locationIsDeleted, setLocationIsDeleted] = useState(false);
    const [teamIsDeleted, setTeamIsDeleted] = useState(false);
    const [playerAdded, setPlayerAdded] = useState(false);
    const [deletedId, setDeletedId] = useState(0);
    const [isShown, setIsShown] = useState(false);
    const [isLeagueAdded, setIsLeagueAdded] = useState(false);


    return (
        <DataPackContext.Provider value={{
            isLoading, setIsLoading,
            isSelected, setIsSelected,
            showLocationDiv, setShowLocationDiv,
            locationIsDeleted, setLocationIsDeleted,
            teamIsDeleted, setTeamIsDeleted,
            playerAdded, setPlayerAdded,
            deletedId, setDeletedId,
            isShown, setIsShown,
            isLeagueAdded, setIsLeagueAdded
        }}>
            {props.children}
        </DataPackContext.Provider>
    )
}