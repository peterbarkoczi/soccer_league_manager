import React, {useContext, useEffect, useState} from "react";
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

    const [deletable, setDeletable] = useState(false);
    const [message, setMessage] = useState("");

    let deletableId = null;

    function setDeletableId() {
        if (deletableId === null) {
            deletableId = props.id;
        } else {
            deletableId = 0;
        }
    }

    const deleteItem = () => {
        if (props.url === "location") {
            axios.delete(`http://localhost:8080/${props.url}/${Number(props.id)}`)
                .then((response) => {
                    console.log(response.data);
                    setDefaultValues();
                })
        }
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        setupMessage();
        const deleteItem = () => {
            try {
                setDeletableId();
                axios.delete(`http://localhost:8080/${props.url}/${Number(deletableId)}`, {cancelToken:source.token})
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

        if (deletable) {
            deleteItem();
            handleClose();
        }
        return () => {
            source.cancel()
        };
    }, [deletable]);

    const setDefaultValues = () => {
        setDeletedId(0);
        setIsDeleted(false);
        setLocationIsDeleted(false);
        setTeamIsDeleted(false);
        setDeletable(false);
    }

    const setupMessage = () => {
        switch (props.url) {
            case ("cups"):
                setMessage(`Biztosan törlöd a ${props.name} kupát?`)
                break;
            case ("location"):
                setMessage(`Biztosan törlöd a ${props.name} helyszínt?`)
                break;
            case ("teams"):
                setMessage(`Biztosan törlöd a ${props.name} csapatot?`)
                break;
            default:
                console.log("no item to delete")
        }
    }

    const deleteById = () => {
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
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button id="confirmDeleteButton" variant="primary" onClick={() => {
                        deleteById();
                        setDeletable(true);
                        deleteItem();
                    }}>
                        Igen
                    </Button>
                    <Button id="cancelDeleteModal" variant="secondary" onClick={handleClose}>
                        Nem
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;