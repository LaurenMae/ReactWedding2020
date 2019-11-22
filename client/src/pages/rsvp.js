import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import DeadlinePassed from './deadlinePassed';
import RsvpForm from './rsvpForm';
import _ from 'lodash';
import { useHistory } from "react-router-dom";

import './rsvp.scss';

const urlDefault = window.location.host.replace('3000', '3001');
const apiUrl = _.get(process.env, 'REACT_APP_API_URL', `http://${urlDefault}`);

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

    const searchName = (event) => {
        event.preventDefault();
        const guest = _.find(guestList, { firstName: values.firstName.toLowerCase().trim(), lastName: values.lastName.toLowerCase().trim()});
        const existingRsvp = _.find(rsvpList, { firstName: values.firstName.toLowerCase().trim(), lastName: values.lastName.toLowerCase().trim()});
        if (_.isUndefined(guest)) {
            alert('No guest matching specific name found, please contact couple');
        } else if (existingRsvp) {
            alert('RSVP already found'); // TODO modal
        } else {
            setGuest(guest);
            history.push(`/RSVP/${guest.firstName}${guest.lastName}`, values);
        }
    };

    const getGuestList = async() => {
        const resp = await fetch(`${apiUrl}/api/getGuestList`, {
            method: 'get',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        });

        return await resp.json();
    };

    const getRsvpList = async() => {
        const resp = await fetch(`${apiUrl}/api/getRsvpList`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sheetName: 'test',
                sheetRange: 'A2:G250'
            })
        });

        return await resp.json();
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

    return (
        <div className="rsvp_container">
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
        </div>
    );
}