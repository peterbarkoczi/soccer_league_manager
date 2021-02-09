import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";
import {DataPackContext} from "../contexts/DataPackContext";
import {useParams} from "react-router-dom";


const AddNewsModal = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [news, setNews] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    const {register, handleSubmit, errors} = useForm({reValidateMode: "onBlur"});
    const onSubmit = () => {
        setIsAdded(true);
        handleClose();
    };

    const {setRefresh} = useContext(DataPackContext);
    const [showNewsModal, setShowNewsModal] = useState(false);

    const {locationName} = useParams();

    const handleClose = () => {
        setRefresh(true);
        setShowNewsModal(false)
    };
    const handleShow = () => setShowNewsModal(true);

    useEffect(() => {
        if (isAdded) {
            axios.post(`${process.env.REACT_APP_API_URL}/news/add_new`, {
                posted: Date.now(),
                title: title,
                description: description,
                news: news
            }, {params: {locationName: locationName.split("_").join(" ")}})
                .then(response => console.log("news added" + response))
                .then(() => setIsAdded(false));
        }

        return (() => {});
    }, [isAdded])

    return (
        <>
            <Button variant="danger" onClick={handleShow} className="addButton" id="addNewsButton">
                Új hír hozzáadása
            </Button>

            <Modal id="addNewNews" show={showNewsModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Új hír hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="addNewsTitle">
                            <Form.Label>A hír címe</Form.Label>
                            <Form.Control
                                name="newNewsTitle"
                                type="text"
                                placeholder="Cím"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }
                                }/>
                        </Form.Group>
                        {/*{errors.newLocationName && errors.newLocationName.type === "required" &&*/}
                        {/*<p className="error">Ezt ki kell tölteni!!!</p>}*/}
                        {/*{errors.newLocationName && errors.newLocationName.type === "minLength" &&*/}
                        {/*<p className="error">Minimum 3 betűsnek kell lenni</p>}*/}
                        {/*{errors.newLocationName && errors.newLocationName.type === "validate" &&*/}
                        {/*<p className="error">Ilyen már van</p>}*/}
                        <Form.Group controlId="addNewsDescription">
                            <Form.Label>Rövid leírás</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="leírás"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="addNewsBody">
                            <Form.Label>Hír</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder="hír"
                                value={news}
                                onChange={(e) => {
                                    setNews(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Button variant={"success"} type="submit" id="addNewsSubmit">
                            Hír hozzáadása
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" id="addLocationClose" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewsModal;