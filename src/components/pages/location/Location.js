import React, {useContext, useEffect, useState} from "react";
import {DataPackContext} from "../../contexts/DataPackContext";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import AddLocationModal from "../../modals/AddLocationModal";

function Location() {
    const {dataPack, setIsSelected, showLocationDiv, setShowLocationDiv, isLoading} = useContext(DataPackContext);
    const [location, setLocation] = useState([]);

    useEffect(() => {
        setLocation(dataPack);
    }, [dataPack])

    const LocationDiv = () => (
        <div className="locations">
            <div id="addLocation">
                <AddLocationModal/>
            </div>
            <h1 id="locationName">Helyszín:</h1>
            <ListGroup className="list" id="locationList">
                {location.map(location => (
                    <ListGroup.Item className="location" key={location.name}>
                        <Link to={{
                            pathname: `liga/${location.name.split(" ").join("")}/bajnoksag`,
                            locationId: location.id
                        }} onClick={() => {
                            setShowLocationDiv(false);
                            setIsSelected(true);
                            localStorage.setItem("locationId", location.id);
                            localStorage.setItem("path", `liga/${location.name.split(" ").join("")}`);
                            localStorage.setItem("location", location.name)
                        }}>{location.name}</Link>
                    </ListGroup.Item>))
                }
            </ListGroup>
        </div>
    )

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        localStorage.clear();
        return (
            showLocationDiv ? <LocationDiv/> : null
        )
    }
}

export default Location;