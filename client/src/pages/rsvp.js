import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function RSVP() {
    const [values, setValues] = useState({
        name: '',
        attendance: '',
        diet: '',
        song: ''
    });

    const handleInputChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    const submitForm = (event) => {
        event.preventDefault();
        update();
    };

    const update = async () => {
        await fetch('http://localhost:3001/test', {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
    };

    const insertUser = async () => {
        await fetch('http://localhost:3001/insert', {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
    };

    return (
        <div>
            <Navbar />
            <div style={{width: '50em', margin: '2em', display: 'inline-block'}}>
                <p>
                    Please submit one RSVP per guest
                </p>
                <Form onSubmit={submitForm}>
                    <FormGroup style={{display: 'inline-flex', margin: '1em'}}>
                        <Label for="name">Guest Name</Label>
                        <Input type="text" name="name" id="name" value={values.name} onChange={handleInputChange} />
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
        </div>
    );
}