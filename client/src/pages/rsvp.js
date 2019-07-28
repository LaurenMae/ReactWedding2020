import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Button, Form, FormGroup, Label, Input, InputGroupAddon, InputGroup } from 'reactstrap';
import _ from 'lodash';

export default function RSVP() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        attendance: '',
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
        await fetch('http://localhost:3001/test', {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
    };

    const getGuestList = async() => {
        const resp = await fetch('http://localhost:3001/getGuestList', {
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
        <div>
            <Navbar />
            <div>
                <h3>Please RSVP by 4th April 2020</h3>
                    {guestList && _.isUndefined(guest) &&
                        <>
                            <p>
                                Please enter your full name below to find your RSVP
                                <br/>
                                
                            </p>
                            <Form onSubmit={searchName}>
                                <div style={{width: '30vw', display: 'inline-block'}}>
                                    <FormGroup style={{margin: '1em'}}>
                                        <InputGroup style={{padding: '0.5em'}}>
                                            <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
                                            <Input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleInputChange}/>
                                        </InputGroup>
                                        <InputGroup style={{padding: '0.5em'}}>
                                            <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
                                            <Input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleInputChange}/>
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div style={{width: '100vw'}}>
                                    <Button type="submit">Search</Button>
                                </div>
                            </Form>
                        </>
                    }
                    {
                        guestList && guest && 
                        <div style={{width: '50em', margin: '2em', display: 'inline-block'}}>
                            <p>
                                Please submit one RSVP per guest
                            </p>
                            <Form onSubmit={submitForm}>
                                <FormGroup style={{display: 'inline-flex', margin: '1em'}}>
                                    <Label for="name">Guest Name</Label>
                                    <Input type="text" name="name" id="name" value={`${values.firstName} ${values.lastName}`} readOnly={true} />
                                </FormGroup>
                                <FormGroup style={{display: 'inline-flex', margin: '1em'}}>
                                    <FormGroup check>
                                        <Label check>
                                        <Input type="radio" name="attendance" value="attending" checked={values.attendance === "attending"} onChange={handleInputChange} />{' '}
                                        Attending
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                        <Input type="radio" name="attendance" value="notAttending" checked={values.attendance === "notAttending"} onChange={handleInputChange} />{' '}
                                        Not Attending
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup style={{display: 'inline-flex', margin: '1em'}}>
                                    <Label for="email">Email Address</Label>
                                    <Input type="text" name="email" id="email" value={values.email} onChange={handleInputChange} />
                                </FormGroup>
                                <FormGroup style={{display: 'grid', margin: '1em'}}>
                                    <Label for="diet">Dietary Requirements</Label>
                                    <Input type="textarea" rows="5" name="diet" id="diet" value={values.diet} onChange={handleInputChange} />
                                </FormGroup>
                                <FormGroup style={{display: 'grid', margin: '1em'}}>
                                    <Label for="song">Song Request</Label>
                                    <Input type="textarea" rows="5" name="song" id="song" value={values.song} onChange={handleInputChange} />
                                </FormGroup>                      
                                <Button type="submit">Submit</Button>
                            </Form>
                        </div>
                    }
                </div>
            </div>
    );
}