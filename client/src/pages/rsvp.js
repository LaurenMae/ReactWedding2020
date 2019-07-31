import React, { useState, useEffect } from 'react';
import MyNavbar from '../components/navbar';
import { Button, Form, FormGroup, Label, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import _ from 'lodash';

import './rsvp.scss';

const apiUrl = _.get(process.env, 'REACT_APP_API_URL', 'http://localhost:3001');

export default function RSVP() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        attendance: 'attending',
        diet: '',
        song: ''
    });

    // todo display closed after the deadline

    const [guestList, setGuestList] = useState([]);
    const [guest, setGuest] = useState();

    const handleInputChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    const submitForm = (event) => {
        event.preventDefault();
        update();
    };

    const searchName = (event) => {
        event.preventDefault();
        const guest = _.find(guestList, { firstName: values.firstName.toLowerCase(), lastName: values.lastName.toLowerCase()});
        if (_.isUndefined(guest)) {
            alert('No guest matching specific name found, please contact couple');
        } else {
            setGuest(guest);
        }
    };

    const update = async () => {
        await fetch(`${apiUrl}/api/test`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
    };

    const getGuestList = async() => {
        // 192.168.1.66
        const resp = await fetch(`http://localhost:3001/getGuestList`, {
            method: 'get',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        });

        return await resp.json();
    };

    useEffect(() => {
        try {
            getGuestList().then(guests => {
                setGuestList(guests);
            }).catch();
        } catch (e) {

        }
    }, []);

    return (
        <>
            <MyNavbar />
            <div className="rsvp_container">
                <h3>Please RSVP by 4th April 2020</h3>
                {guestList && _.isUndefined(guest) &&
                    <>
                        <h4>Please enter your full name below to find your RSVP</h4>
                        <Form onSubmit={searchName}>
                            <div>
                                <FormGroup>
                                    <InputGroup size="lg">
                                        <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
                                        <Input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleInputChange}/>
                                    </InputGroup>
                                    <InputGroup size="lg">
                                        <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
                                        <Input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleInputChange}/>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                            <div>
                                <Button type="submit">Search</Button>
                            </div>
                        </Form>
                    </>
                }
                {
                    guestList && guest && 
                    <div>
                        <h4>Please submit one RSVP per guest</h4>
                        <Form onSubmit={submitForm}>
                            <FormGroup>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">Guest Name</InputGroupAddon>
                                    <Input type="text" name="name" id="name" value={`${values.firstName} ${values.lastName}`} readOnly={true} />
                                </InputGroup>
                                <div style={{display: 'flex', padding: '0 3vw 0 3vw'}}>
                                    <InputGroup size="lg">
                                        <InputGroupAddon addonType="prepend">
                                            <Input addon type="radio" name="attendance" value="attending" checked={values.attendance === "attending"} onChange={handleInputChange} />{' '}
                                        </InputGroupAddon>
                                        Attending
                                    </InputGroup>
                                    <InputGroup size="lg">
                                        <InputGroupAddon addonType="prepend">
                                            <Input addon type="radio" name="attendance" value="notAttending" checked={values.attendance === "notAttending"} onChange={handleInputChange} />{' '}
                                        </InputGroupAddon>
                                        Not Attending
                                    </InputGroup>
                                </div>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">Email Address</InputGroupAddon>
                                    <Input type="text" name="email" id="email" value={values.email} onChange={handleInputChange} />
                                </InputGroup>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">Dietary Requirements</InputGroupAddon>
                                    <Input type="textarea" rows="5" name="diet" id="diet" value={values.diet} onChange={handleInputChange} />
                                </InputGroup>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">Song Request</InputGroupAddon>
                                    <Input type="textarea" rows="5" name="song" id="song" value={values.song} onChange={handleInputChange} />
                                </InputGroup>
                            </FormGroup>                      
                            <Button type="submit">Submit</Button>
                        </Form>
                    </div>
                }
            </div>
        </>
    );
}