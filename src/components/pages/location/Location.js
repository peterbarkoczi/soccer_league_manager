import React, {lazy, Suspense, useContext, useEffect, useState} from "react";
import {DataPackContext} from "../../contexts/DataPackContext";
import {Link} from "react-router-dom";
import {Button, ListGroup} from "react-bootstrap";
import AddLocationModal from "../../modals/AddLocationModal";
import axios from "axios";

function usePrefetch(factory) {
    const [component, setComponent] = useState(null);

    useEffect(() => {
        factory();
        const comp = lazy(factory);
        setComponent(comp);
    }, [factory]);
    return component;
}

const importModal = () => import("../../modals/DeleteModal");

function Location() {
    const {
        setIsSelected,
        showLocationDiv, setShowLocationDiv,
        locationIsDeleted, setLocationIsDeleted,
        isShown, setIsShown} = useContext(DataPackContext);
    const [location, setLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedId, setSelectedId] = useState(0);
    const DeleteModal = usePrefetch(importModal);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            setSelectedId(0)
            try {
                axios.get("http://localhost:8080/location/list", {cancelToken:source.token})
                    .then(response => setLocation(response.data))
                    .then(() => setIsLoading(false))
                    .then(() => setLocationIsDeleted(false))
                    .then(() => setSelectedId(0));
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
                        {'   '}
                        <Button id={"delete-" + location.name} className="deleteLocationButton" variant="warning" onClick={() => {
                            setIsShown(true);
                            setSelectedId(location.id)}}>
                            Törlés
                        </Button>
                        <Suspense fallback={<h1>Loading...</h1>}>
                            {isShown && selectedId === location.id && <DeleteModal id={selectedId} name={location.name} url="location"/>}
                        </Suspense>
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