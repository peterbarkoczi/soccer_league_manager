import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {DataPackContext} from "../contexts/DataPackContext";
import {useForm} from "react-hook-form";
import axios from "axios";

const EditNewsModal = (props) => {

    const {
        setRefresh,
        newsIsEditable, setNewsIsEditable,
    } = useContext(DataPackContext);

    const [isEdited, setIsEdited] = useState(false);

    const [tempTitle, setTempTitle] = useState(props.news["title"]);
    const [tempDescription, setTempTempDescription] = useState(props.news["description"]);
    const [tempNews, setTempNews] = useState(props.news["news"]);

    const handleClose = () => {
        setNewsIsEditable(false)
    };

    const {handleSubmit} = useForm({reValidateMode: "onBlur"});
    const onSubmit = () => {
        setIsEdited(true);
    };

    useEffect(() => {
        if (isEdited) {
            axios.patch(`${process.env.REACT_APP_API_URL}/news/edit`, {
                id: props.news["id"],
                title: tempTitle,
                description: tempDescription,
                news: tempNews,
            }).then(() => {
                setIsEdited(false);
                setRefresh(true);
                handleClose();
            })
        }
    }, [isEdited])

    return (
        <Modal id="editNews" show={newsIsEditable} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{props.news["title"]} szerkesztése</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="editNewsTitle">
                        <Form.Label>A hír címe</Form.Label>
                        <Form.Control
                            name="editNewsTitle"
                            type="text"
                            placeholder="Cím"
                            value={tempTitle}
                            onChange={(e) => {
                                setTempTitle(e.target.value)
                            }
                            }/>
                    </Form.Group>
                    <Form.Group controlId="editNewsDescription">
                        <Form.Label>Rövid leírás</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="leírás"
                            value={tempDescription}
                            onChange={(e) => {
                                setTempTempDescription(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="editNewsBody">
                        <Form.Label>Hír</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            placeholder="hír"
                            value={tempNews}
                            onChange={(e) => {
                                setTempNews(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Button variant="success" type="submit" id="confirmNewsChanges">
                        Változások mentése
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button id="cancelEditNewsModal" variant="danger" onClick={handleClose}>
                    Kilépés
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditNewsModal;