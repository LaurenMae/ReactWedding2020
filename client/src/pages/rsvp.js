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
import Countdown from '../components/Countdown';
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

    // todo display closed after the deadline

    const [guestList, setGuestList] = useState([]);
    const [guest, setGuest] = useState();

    const handleInputChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    const searchName = (event) => {
        event.preventDefault();
        const guest = _.find(guestList, { firstName: values.firstName.toLowerCase().trim(), lastName: values.lastName.toLowerCase().trim()});
        if (_.isUndefined(guest)) {
            alert('No guest matching specific name found, please contact couple');
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
            <h4>Please RSVP by 1st February 2020</h4>
            <Container className="countdown">
                <Countdown 
                    title='Remaining Response Time'
                    dateTo='February 1, 2020 13:30:00 GMT+01:00'
                    mostSignificantFigure="day" />
            </Container>
            {
                guestList && _.isUndefined(guest) &&
                <Thumbnail style={{ padding: '10px', width: '80%' }}>
                    <Row style={{textAlign:'center', padding: '10px'}}>
                        <Col xs={12} sm={12} md lg>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
                                <Input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleInputChange}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center', padding: '10px'}}>
                        <Col xs={12} sm={12} md lg>
                            <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
                                <Input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleInputChange}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center', padding: '10px'}}>
                        <Col>
                            <Button onClick={searchName}>RSVP</Button>
                        </Col>
                    </Row>
                </Thumbnail>
            }
        </Container>
    );
}