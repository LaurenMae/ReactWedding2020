import React, { useState, useEffect } from 'react';
import { 
    Button,
    Input,
    InputGroupAddon,
    InputGroup,
    Container,
    Row,
    Col
} from 'reactstrap';
import DateCountdown from 'react-date-countdown-timer';
import _ from 'lodash';

import './rsvp.scss';
const urlDefault = window.location.host.replace('3000', '3001');
const apiUrl = _.get(process.env, 'REACT_APP_API_URL', `http://${urlDefault}`);

export default function RSVP() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        attendance: 'attending',
        diet: '',
        song: '',
        phone: ''
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
        const guest = _.find(guestList, { firstName: values.firstName.toLowerCase().trim(), lastName: values.lastName.toLowerCase().trim()});
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
        const resp = await fetch(`${apiUrl}/api/getGuestList`, {
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
        <Container className="rsvp_container">
            <h3>Please RSVP by 1st February 2020</h3>
            <Container className="countdown">
                <h4>Countdown to RSVP</h4>
                <DateCountdown dateTo='February 1, 2020 13:30:00 GMT+01:00'
                    mostSignificantFigure="day"
                    callback={()=>alert('The day is here')} />
            </Container>
            {guestList && _.isUndefined(guest) &&
                <Container style={{textAlign:'center'}}>
                    <h4>Please enter your full name below to find your RSVP</h4>
                    <Row style={{textAlign:'center'}}>
                        <Col xs={12} sm={12} md lg>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
                                <Input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleInputChange}/>
                            </InputGroup>
                        </Col>
                        <Col xs={12} sm={12} md lg>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
                                <Input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleInputChange}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col>
                            <Button onClick={searchName}>Search</Button>
                        </Col>
                    </Row>
                </Container>
            }
            {
                guestList && guest && 
                <Container style={{textAlign:'center'}}>
                    <h4>Please submit one RSVP per guest</h4>
                    <Row style={{textAlign:'center'}}>
                        <Col>
                            <InputGroup size="lg">
                                <Input style={{textAlign: 'center'}} type="text" name="name" id="name" value={_.startCase(`${values.firstName} ${values.lastName}`)} readOnly={true} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col xs={12} sm={12} md lg>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">
                                    <Input addon type="radio" name="attendance" value="attending" checked={values.attendance === "attending"} onChange={handleInputChange} />{' '}
                                </InputGroupAddon>
                                I'll be there
                            </InputGroup>
                        </Col>
                        <Col xs={12} sm={12} md lg>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">
                                    <Input addon type="radio" name="attendance" value="notAttending" checked={values.attendance === "notAttending"} onChange={handleInputChange} />{' '}
                                </InputGroupAddon>
                                I'll be there in spirit
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col xs={12} sm={12} md lg>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">Phone Number</InputGroupAddon>
                                <Input type="text" name="phone" id="phone" value={values.phone} onChange={handleInputChange} />
                            </InputGroup>
                        </Col>
                        <Col xs={12} sm={12} md lg>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">Email Address</InputGroupAddon>
                                <Input type="text" name="email" id="email" value={values.email} onChange={handleInputChange} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">Dietary Requirements</InputGroupAddon>
                                <Input type="textarea" rows="5" name="diet" id="diet" value={values.diet} onChange={handleInputChange} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">Song Request</InputGroupAddon>
                                <Input type="textarea" rows="5" name="song" id="song" value={values.song} onChange={handleInputChange} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col>
                            <Button onClick={submitForm}>Submit</Button>
                        </Col>
                    </Row>
                </Container>                      
            }
        </Container>
    );
}