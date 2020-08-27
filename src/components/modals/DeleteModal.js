import React, {useContext, useEffect, useRef, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {CupContext} from "../contexts/CupContext";
import {DataPackContext} from "../contexts/DataPackContext";

// function useEffectOnce(cb) {
//     const didRun = useRef(false);
//
//     useEffect(() => {
//         console.log("useEffectOnce");
//         if (!didRun.current) {
//             cb();
//             didRun.current = true;
//         }
//     })
// }

function DeleteModal(props) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    const handleClose = () => setIsShown(false);
    // const handleShow = () => setShow(true);

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

    // useEffectOnce(() => {
    //     console.log(deletedId);
    //     console.log(locationIsDeleted);
    //     if ((isDeleted || locationIsDeleted || teamIsDeleted) && deletedId !== 0) {
    //         axios.delete(`http://localhost:8080/${props.url}/${deletedId}`, {cancelToken: source.token})
    //             .then(response => console.log(response.data))
    //             .then(() => setDefaultValues())
    //             .then(() => setDeletedId(0));
    //     }
    // })

    useEffect(() => {
        const deleteItem = () => {
            try {
                setDeletableId();
                // if ((isDeleted || locationIsDeleted || teamIsDeleted) && deletedId !== 0) {
                    axios.delete(`http://localhost:8080/${props.url}/${deletableId}`, {cancelToken: source.token})
                        .then(response => console.log(response.data))
                        .then(() => setDefaultValues());
            // }
        } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cancelled");
                } else {
                    throw error;
                }
            }
        }

        deleteItem();
        return () => {source.cancel()};
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
            {/*<Button variant="warning" onClick={handleShow}>*/}
            {/*    Törlés*/}
            {/*</Button>*/}

            <Modal show={isShown} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Megerősítés</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.name + " törölve"}</Modal.Body>
                <Modal.Footer>
                    {/*<Button variant="secondary" onClick={handleClose}>*/}
                    {/*    Mégse*/}
                    {/*</Button>*/}
                    <Button variant="primary" onClick={() => {
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