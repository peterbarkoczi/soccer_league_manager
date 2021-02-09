import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import EditContactsModal from "../../modals/EditContactsModal";
import {DataPackContext} from "../../contexts/DataPackContext"

import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import PersonIcon from '@material-ui/icons/Person';
import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import MailIcon from '@material-ui/icons/Mail';
import {hasRole} from "../../util/Auth";

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

  .icon {
    font-size: 1.3em;
  }

`

const Contact = () => {

    const {locationName} = useParams();
    const [actualLocation, setActualLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {refresh, setRefresh} = useContext(DataPackContext)

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/location/get_location_contact`,
            {params: {locationName: locationName.split("_").join(" ")}})
            .then((response) => {
                setActualLocation(response.data);
                setIsLoading(false);
                setRefresh(false);
            })

        return () => {
            console.log("Contact unmounted");
        }

    }, [refresh])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <ContactStyle>
                <div className="contentList">
                    <h1>Kapcsolat</h1>
                    <div id="contactDetails">
                        <h3><LocationOnTwoToneIcon className={"icon"}/>{" "}
                            <a rel="noopener noreferrer" target="_blank"
                               href={`https://www.google.hu/maps/place/${actualLocation["address"]}`}>
                                {actualLocation["address"]}
                            </a>
                        </h3>
                        <h3><PersonIcon className={"icon"}/>{" "} {actualLocation["contactName"]}</h3>
                        <h3><PhoneAndroidTwoToneIcon className={"icon"}/>{" "} {actualLocation["contactPhone"]}</h3>
                        <h3><MailIcon className={"icon"}/>{" "} {actualLocation["contactMail"]}</h3>
                    </div>
                    {hasRole(["admin"]) &&
                    <EditContactsModal contacts={actualLocation} locationName={locationName.split("_").join(" ")}/>
                    }
                </div>
            </ContactStyle>
        )
    }
}

export default Contact;