import React, { useState } from 'react';
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
        console.log(values);
       // insert data
       insertUser();
    };

    const insertUser = async () => {
        console.log(values);
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
            <div className="container" style={{ width: "50%", textAlign: "left:"}}>
                <Form onSubmit={submitForm}>
                    <FormGroup>
                        <Label for="name">Guest Name</Label>
                        <Input type="text" name="name" id="name" value={values.name} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup tag="fieldset">
                    <legend>Radio Buttons</legend>
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
                    <FormGroup>
                        <Label for="diet">Dietary Requirements</Label>
                        <Input type="textarea" name="diet" id="diet" value={values.diet} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="song">Song Request</Label>
                        <Input type="textarea" name="song" id="song" value={values.song} onChange={handleInputChange} />
                    </FormGroup>                      
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    );
}