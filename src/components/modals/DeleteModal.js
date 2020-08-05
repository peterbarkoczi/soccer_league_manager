import React, {useContext, useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {CupContext} from "../contexts/CupContext";


function DeleteModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {isDeleted, setIsDeleted} = useContext(CupContext);
    const [deletedId, setDeletedId] = useState(Number);

    useEffect(() => {
        if (isDeleted && deletedId !== 0) {
            axios.delete(`http://localhost:8080/${props.url}/${deletedId}`)
                .then((response) => console.log(response.data))
            console.log(deletedId);
            setIsDeleted(false);
        }
    }, [isDeleted])

    function deleteCup(id) {
        setIsDeleted(true);
        setDeletedId(id);
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
                        deleteCup(props.id)}}>
                        Törlés
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;