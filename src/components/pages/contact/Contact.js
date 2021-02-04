import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {useParams} from "react-router-dom";

const ContactStyle = styled.div`

  h1 {
    color: white;
    text-align: center;
  }

  #contactDetails {
    background: rgba(9, 8, 8, 0.6);
    padding: 1% 0;
  }

  #contactDetails h3 {
    color: white;
    margin-top: 0;
    margin-left: 1.2%;
    margin-bottom: 1%;
  }
`

const Contact = () => {

    const {locationName} = useParams();
    const [actualLocation, setActualLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/location/get_location_contact`,
            {params: {locationName: locationName.split("_").join(" ")}})
            .then((response) => {
                setActualLocation(response.data);
                setIsLoading(false);
            })

        return () => {
            console.log("Contact unmounted");
        }

    }, [])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <ContactStyle>
                <div className="contentList">
                    <h1>Kapcsolat</h1>
                    <div id="contactDetails">
                        <h3>Pálya címe:{" "}
                            <a rel="noopener noreferrer" target="_blank"
                               href={`https://www.google.hu/maps/place/${actualLocation["address"]}`}>
                                 {actualLocation["address"]}
                            </a>
                        </h3>
                        <h3>Név: {actualLocation["contactName"]}</h3>
                        <h3>Tel: {actualLocation["contactPhone"]}</h3>
                        <h3>Mail: {actualLocation["contactMail"]}</h3>
                    </div>
                </div>
            </ContactStyle>
        )
    }
}

export default Contact;