import React, {useContext, useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {CupContext} from "../contexts/CupContext";
import {DataPackContext} from "../contexts/DataPackContext";


function DeleteModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {isDeleted, setIsDeleted} = useContext(CupContext);
    const {
        locationIsDeleted, setLocationIsDeleted,
        teamIsDeleted, setTeamIsDeleted
    } = useContext(DataPackContext);
    const [deletedId, setDeletedId] = useState(0);

    useEffect(() => {
        if ((isDeleted || locationIsDeleted || teamIsDeleted) && deletedId !== 0) {
            axios.delete(`http://localhost:8080/${props.url}/${deletedId}`)
                .then((response) => console.log(response.data))
            console.log(deletedId);
            setIsDeleted(false);
            setLocationIsDeleted(false);
            setTeamIsDeleted(false);
            setDeletedId(0);
        }
    }, [isDeleted, locationIsDeleted, teamIsDeleted])

    function deleteById(id) {
        if (props.url === "cups") {
            setIsDeleted(true);
            console.log("setIsDeleted");
        } else if (props.url === "location") {
            setLocationIsDeleted(true);
            console.log("setLocationIsDeleted");
        } else if (props.url === "teams") {
            setTeamIsDeleted(true);
            console.log("setTeamIsDeleted");
        }
        setDeletedId(id);
        console.log("deletedId: " + id);
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Törlés
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Megerősítés</Modal.Title>
                </Modal.Header>
                <Modal.Body>Biztosan törlölni akarod?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Mégse
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose();
                        deleteById(props.id)
                    }}>
                        Törlés
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;