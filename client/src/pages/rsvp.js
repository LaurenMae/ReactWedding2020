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
import Thumbnail from '../components/Thumbnail';
import DateCountdown from 'react-date-countdown-timer';
import _ from 'lodash';

import './rsvp.scss';
import { rsvpFormEntries } from './rsvpEntries.json';

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
        await fetch(`${apiUrl}/api/rsvp`, {
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
                    callback={()=>alert('Show a different page?')} />
            </Container>
            {guestList && _.isUndefined(guest) &&
                <Thumbnail>
                    <Row style={{textAlign:'center'}}>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <InputGroup size="md">
                                <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
                                <Input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleInputChange}/>
                            </InputGroup>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <InputGroup size="md">
                                <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
                                <Input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleInputChange}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center', margin: '1%'}}>
                        <Col>
                            <Button onClick={searchName}>RSVP</Button>
                        </Col>
                    </Row>
                </Thumbnail>
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
                    {
                        rsvpFormEntries.map(({value, onChange, ...entry}, index) => (
                            <Row style={{textAlign:'center'}} key={index}>
                                <Col>
                                    {
                                        entry.type === 'radio' &&
                                        <InputGroup size="lg">
                                            <InputGroupAddon addonType="prepend">
                                                <Input addon type={entry.type} name={entry.name} value={value} checked={values.attendance === value} onChange={handleInputChange} />
                                            </InputGroupAddon>
                                            {entry.label}
                                        </InputGroup>
                                    }
                                    {/* TODO get rid of the eval!! */}
                                    {
                                        entry.type !== 'radio' &&
                                        <InputGroup size="lg">
                                            <InputGroupAddon addonType="prepend">{entry.label}</InputGroupAddon>
                                            <Input style={{textAlign: 'center'}} {...entry} value={eval(value)} onChange={eval(onChange)} />
                                        </InputGroup>
                                    }
                                </Col>
                            </Row>
                        ))
                    }
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