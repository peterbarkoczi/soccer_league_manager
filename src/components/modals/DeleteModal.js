import React, {useContext, useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {CupContext} from "../contexts/CupContext";
import {DataPackContext} from "../contexts/DataPackContext";


function DeleteModal(props) {

    const handleClose = () => setIsShown(false);

    const {setIsDeleted} = useContext(CupContext);
    const {
        setLocationIsDeleted,
        setTeamIsDeleted,
        setDeletedId,
        isShown, setIsShown
    } = useContext(DataPackContext);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let deletableId = null;

    function setDeletableId() {
        if (deletableId === null) {
            deletableId = props.id;
        } else {
            deletableId = 0;
        }
        console.log(deletableId);
    }

    useEffect(() => {
        const deleteItem = () => {
            try {
                setDeletableId();
                axios.delete(`http://localhost:8080/${props.url}/${deletableId}`, {cancelToken: source.token})
                    .then(response => console.log(response.data))
                    .then(() => setDefaultValues());
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cancelled");
                } else {
                    throw error;
                }
            }
        }

        deleteItem();
        return () => {
            source.cancel()
        };
    }, []);

    const setDefaultValues = () => {
        setDeletedId(0);
        setIsDeleted(false);
        setLocationIsDeleted(false);
        setTeamIsDeleted(false)
    }

    function deleteById() {
        switch (props.url) {
            case ("cups"):
                setIsDeleted(true);
                console.log("setIsDeleted");
                break;
            case ("location"):
                setLocationIsDeleted(true);
                console.log("setLocationIsDeleted");
                break;
            case ("teams"):
                setTeamIsDeleted(true);
                console.log("setTeamIsDeleted");
                break;
            default:
                console.log("no item to delete")
        }
        deletableId = 0;
    }

    return (
        <>
            <Modal show={isShown} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Megerősítés</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.name + " törölve"}</Modal.Body>
                <Modal.Footer>
                    <Button id="confirmDeleteButton" variant="primary" onClick={() => {
                        handleClose();
                        deleteById();
                    }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;