import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {DataPackContext} from "../contexts/DataPackContext";
import {useForm} from "react-hook-form";
import axios from "axios";
import PhoneInput from "react-phone-input-2";


const EditContactsModal = (props) => {

    const {
        setRefresh,
        contactsIsEditable, setContactsIsEditable,
    } = useContext(DataPackContext);

    const [isEdited, setIsEdited] = useState(false);

    const [tempAddress, setTempAddress] = useState(props.contacts["address"]);
    const [tempContactName, setTempContactName] = useState(props.contacts["contactName"]);
    const [tempContactPhone, setTempContactPhone] = useState(props.contacts["contactPhone"]);
    const [tempContactMail, setTempContactMail] = useState(props.contacts["contactMail"]);

    const handleShow = () => setContactsIsEditable(true);

    const handleClose = () => {
        setContactsIsEditable(false)
        resetFields();
    };

    const {handleSubmit} = useForm({reValidateMode: "onBlur"});
    const onSubmit = () => {
        setIsEdited(true);
    };

    const resetFields = () => {
        setTempAddress(props.contacts["address"]);
        setTempContactName(props.contacts["contactName"]);
        setTempContactPhone(props.contacts["contactPhone"]);
        setTempContactMail(props.contacts["contactMail"]);
    }

    useEffect(() => {
        if (isEdited) {
            axios.patch(`${process.env.REACT_APP_API_URL}/location/edit_contact`, {
                locationId: props.contacts["locationId"],
                address: tempAddress,
                contactName: tempContactName,
                contactPhone: tempContactPhone,
                contactMail: tempContactMail
            }).then(() => {
                setIsEdited(false);
                setRefresh(true);
                handleClose();
            })
        }
    }, [isEdited])

    return (
        <>
            <Button variant="danger" onClick={handleShow} className="addButton" id="editContactsButton">
                Kontaktok szerkesztése
            </Button>
            <Modal id="editContacts" show={contactsIsEditable} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{props.locationName} kontaktok szerkesztése</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="editContactAddress">
                            <Form.Label>Cím</Form.Label>
                            <Form.Control
                                name="editContactAddress"
                                type="text"
                                placeholder="Cím"
                                value={tempAddress === null ? "" : tempAddress}
                                onChange={(e) => {
                                    setTempAddress(e.target.value)
                                }
                                }/>
                        </Form.Group>
                        <Form.Group controlId="editContactName">
                            <Form.Label>Név</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kontakt személy neve"
                                value={tempContactName === null ? "" : tempContactName}
                                onChange={(e) => {
                                    setTempContactName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="editContactPhone">
                            <Form.Label>Telefonszám</Form.Label>
                            <PhoneInput country={"hu"} value={tempContactPhone === null ? "" : tempContactPhone} onChange={(e) => {
                                setTempContactPhone(e);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="editContactMail">
                            <Form.Label>Telefonszám</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="kontakt mail"
                                value={tempContactMail === null ? "" : tempContactMail}
                                onChange={(e) => {
                                    setTempContactMail(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" id="confirmContactsChanges">
                            Változások mentése
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="cancelEditContactsModal" variant="danger" onClick={handleClose}>
                        Kilépés
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default EditContactsModal;