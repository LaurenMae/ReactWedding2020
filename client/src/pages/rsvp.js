import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import DeadlinePassed from './deadlinePassed';
import RsvpForm from './rsvpForm';
import _ from 'lodash';
import { useHistory } from "react-router-dom";
import { getRsvpForGuest, getGuestList, getRsvpList } from './helpers';
import { Modal, Button } from 'react-bootstrap';

import './rsvp.scss';
import styled from 'styled-components';

const Page = styled.div`
    text-align: center;
    margin: 0 10%;
    width: 80%;
`;

export default function RSVP() {
    const history = useHistory();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        attendance: 'attending',
        diet: '',
        song: '',
        phone: ''
    });

    const [guestList, setGuestList] = useState([]);
    const [rsvpList, setRsvpList] = useState([]);
    const [guest, setGuest] = useState();
    const [deadlinePassed, setDeadlinePassed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const searchName = (event) => {
        event.preventDefault();
        const guest = getRsvpForGuest(guestList, rsvpList, values.firstName, values.lastName);
        
        if (typeof guest === 'string') {
            setShowModal(true);
            setModalContent(guest);
        } else {
            setGuest(guest);
            history.push(`/RSVP/${guest.firstName}${guest.lastName}`, values);
        }
    };

    useEffect(() => {
        getGuestList().then(guests => {
            setGuestList(guests);
        }).catch();
    }, []);

    useEffect(() => {
        getRsvpList().then(rsvps => {
            setRsvpList(rsvps);
        }).catch();
    }, []);

    const countdownReached = () => {
        setDeadlinePassed(true);
    };

    const handleClose = () => {
        setShowModal(false);
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
            <Page className="rsvp_container">
                {
                    !deadlinePassed &&
                    <>
                        <h4>Please RSVP by 1st February 2020</h4>
                        <div className="countdown">
                            <Countdown 
                                title='Remaining Response Time'
                                dateTo='February 1, 2020 23:59:59 GMT+01:00'
                                mostSignificantFigure="day"
                                callback={() => countdownReached()} />
                        </div>
                        {
                            guestList && _.isUndefined(guest) &&
                            <RsvpForm submit={searchName} values={values} setValues={setValues} />
                        }

                    </>
                }
                {
                    deadlinePassed && <DeadlinePassed />
                }
            </Page>
        </>
    );
}