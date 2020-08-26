import React, {useContext, useEffect, useState} from "react";
import {DataPackContext} from "../../contexts/DataPackContext";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import AddLocationModal from "../../modals/AddLocationModal";
import DeleteModal from "../../modals/DeleteModal";
import axios from "axios";

function Location() {
    const {
        setIsSelected,
        showLocationDiv, setShowLocationDiv,
        locationIsDeleted} = useContext(DataPackContext);
    const [location, setLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            try {
                axios.get("http://localhost:8080/location/list", {cancelToken:source.token})
                    .then(response => setLocation(response.data))
                    .then(() => setIsLoading(false));
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cancelled");
                } else {
                    throw error;
                }
            }
        }

        loadData();
        return () => {source.cancel()}
    }, [locationIsDeleted]);

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
                        }} className="locationLink">{location.name}</Link>
                        {'   '}<DeleteModal id={location.id} url="location"/>
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