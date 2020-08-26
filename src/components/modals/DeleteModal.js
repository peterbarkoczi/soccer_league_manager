import React, {useContext, useEffect, useRef, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {CupContext} from "../contexts/CupContext";
import {DataPackContext} from "../contexts/DataPackContext";

function useEffectOnce(cb) {
    const didRun = useRef(false);

    useEffect(() => {
        console.log("useEffectOnce");
        if (!didRun.current) {
            cb();
            didRun.current = true;
        }
    })
}

function DeleteModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {isDeleted, setIsDeleted} = useContext(CupContext);
    const {
        locationIsDeleted, setLocationIsDeleted,
        teamIsDeleted, setTeamIsDeleted,
        deletedId, setDeletedId
    } = useContext(DataPackContext);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    useEffectOnce(() => {
        if ((isDeleted || locationIsDeleted || teamIsDeleted) && deletedId !== 0) {
            axios.delete(`http://localhost:8080/${props.url}/${deletedId}`, {cancelToken: source.token})
                .then(response => console.log(response.data))
                .then(() => setDefaultValues())
                .then(() => setDeletedId(0));
        }
    })

    // useEffect(() => {
    //     console.log(deletedId);
    //     const deleteItem = () => {
    //         try {
    //             if ((isDeleted || locationIsDeleted || teamIsDeleted) && deletedId !== 0) {
    //                 axios.delete(`http://localhost:8080/${props.url}/${deletedId}`, {cancelToken: source.token})
    //                     .then(response => console.log(response.data))
    //                     .then(() => setDefaultValues());
    //         }
    //     } catch (error) {
    //             if (axios.isCancel(error)) {
    //                 console.log("cancelled");
    //             } else {
    //                 throw error;
    //             }
    //         }
    //     }
    //
    //     deleteItem();
    //     return () => {source.cancel()};
    // }, [deletedId])

    const setDefaultValues = () => {
        setDeletedId(0);
        setIsDeleted(false);
        setLocationIsDeleted(false);
        setTeamIsDeleted(false)
    }

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
        console.log("deletedById: " + id);

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