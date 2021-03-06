import React, { useState, useEffect } from 'react';
import { 
    Button,
    Input,
    FormGroup,
    Label,
    FormFeedback,
    Row,
    Col
} from 'reactstrap';
import _ from 'lodash';
import Thumbnail from '../components/Thumbnail';
import Done from '@material-ui/icons/Done';

import './inviteRsvp.scss';
import rsvpFormEntries from './rsvpEntries.json';
import styled from 'styled-components';
import {
    getHotelBookings,
    rsvp,
    getRsvpForGuest,
    getGuestList,
    getRsvpList
} from './helpers';
import { Modal } from 'react-bootstrap';

const Page = styled.div`
    text-align: center;
    margin: 0 10%;
    width: 80%;
`;

export default function InviteRsvp({ history }) {
    const [values, setValues] = useState(history.location.state);
    const [error, setError] = useState();
    const [radioValues, setRadioValues] = useState();
    const [noneRadioValues, setNoneRadioValues] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        setRadioValues(rsvpFormEntries.filter(entry => entry.type === 'radio'));
        setNoneRadioValues(rsvpFormEntries.filter(entry => entry.type !== 'radio'));
    }, []);
    
    const toggle = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.attributes.name.nodeValue]: event.target.attributes.value.nodeValue}));
    };

    // eslint-disable-next-line no-unused-vars
    const handleInputChange = (event) => {
        event.persist();
        setError(null);
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    const submitForm = (event) => {
        event.preventDefault();

        if (!values.email.trim() && !values.phone.trim()) {
            setError('You need to provide an email address or phone number');
        } else {
            update();
        }        
    };

    const update = async () => {
        const roomDetails = await getHotelBookings(values.firstName, values.lastName);

        try {
            const guestList = await getGuestList();
            const rsvpGuestList = await getRsvpList();
            const guest = await getRsvpForGuest(guestList, rsvpGuestList, values.firstName, values.lastName);

            if (typeof guest === 'string') {
                setShowModal(true);
                setModalContent(guest);
            } else {
                await rsvp({ values: {...values}, hotels: {...roomDetails} });

                history.push(`/RSVP/${values.firstName}${values.lastName}/thankyou`, {
                    email: values.email,
                    attendance: values.attendance
                });
            }
        } catch (err) {
            console.error('Error during rsvp', err);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        history.push(`/Home`);
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Page>
                <Thumbnail>
                    <Row style={{textAlign:'center', padding: '10px'}}>
                        <Col>
                            <div>{_.startCase(`${values.firstName} ${values.lastName}`)}, please complete the form below to RSVP</div>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{padding: '0 0 10px 0'}}>
                    {
                        radioValues && radioValues.map(({onChange, ...entry}) => {
                            return entry.options.map(({ name, value, label }, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                    <div style={{ display: 'inline-flex' }}>
                                        <div style={{ border: '1px solid rgba(0,0,0,.5)', width: '30px', height: '30px', margin: '0 10px' }}
                                            name={name}
                                            value={value}
                                            onClick={toggle}
                                        >
                                            <Done style={{ visibility: values.attendance === value ? 'visible' : 'hidden' }} />
                                        </div>
                                        <div style={{ lineHeight: 2 }}>{label}</div>
                                    </div>
                                </Col>
                            ))
                        })
                    }
                    </Row>
                    {
                        noneRadioValues && noneRadioValues.map(({onChange, validate, value, label, ...props}, index) => (
                            <Row key={index}>
                                <Col>
                                    <FormGroup style={{ textAlign: 'left' }} row>
                                        <Col xs={12} sm={12} md={12} lg={2}>
                                            <Label for="exampleEmail">{label}</Label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={10}>
                                            {/* eslint-disable-next-line no-eval */}
                                            <Input invalid={error && validate} {...props} value={eval(value)} onChange={eval(onChange)} />
                                            <FormFeedback invalid={error}>{error}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                        ))
                    }
                    <Row style={{textAlign:'center', padding: '10px'}}>
                        <Col>
                            <Button onClick={submitForm}>Submit</Button>
                        </Col>
                    </Row>
                </Thumbnail>
            </Page>
        </>
    )
};