import React, { useState } from 'react';
import { 
    Button,
    Input,
    InputGroupAddon,
    InputGroup,
    Container,
    Row,
    Col
} from 'reactstrap';
import _ from 'lodash';
import Thumbnail from '../components/Thumbnail';

import './rsvp.scss';
import { rsvpFormEntries } from './rsvpEntries.json';

const urlDefault = window.location.host.replace('3000', '3001');
const apiUrl = _.get(process.env, 'REACT_APP_API_URL', `http://${urlDefault}`);

export default function InviteRsvp({ history }) {
    const [values, setValues] = useState(history.location.state);
    
    const handleInputChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    const submitForm = (event) => {
        event.preventDefault();
        update();
    };

    const update = async () => {
        await fetch(`${apiUrl}/api/rsvp`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });

        history.push(`/RSVP/${values.firstName}${values.lastName}/thankyou`, values.email);
    };

    return (
        <Thumbnail style={{ padding: '10px', width: '80%' }}>
            <Row style={{textAlign:'center', padding: '10px'}}>
                <Col>
                    <InputGroup size="lg">
                        <Input style={{textAlign: 'center'}} type="text" name="name" id="name" value={_.startCase(`${values.firstName} ${values.lastName}`)} readOnly={true} />
                    </InputGroup>
                </Col>
            </Row>
            <Row style={{textAlign:'center'}}>
            {
                rsvpFormEntries.map(({value, onChange, ...entry}, index) => (
                    <>
                        {
                            entry.type === 'radio' &&
                            <Col key={index} xs={6} sm={6} md={6} lg={6} style={{ padding: '10px' }}>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">
                                        <Input addon type={entry.type} name={entry.name} value={value} checked={values.attendance === value} onChange={handleInputChange} />
                                    </InputGroupAddon>
                                    {entry.label}
                                </InputGroup>
                            </Col>
                        }
                        {/* TODO get rid of the eval!! */}
                        {
                            entry.type !== 'radio' &&
                            <Col key={index} xs={12} sm={12} md={12} lg={12} style={{ padding: '10px' }}>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">{entry.label}</InputGroupAddon>
                                    <Input style={{textAlign: 'center'}} {...entry} value={eval(value)} onChange={eval(onChange)} />
                                </InputGroup>
                            </Col>
                        }
                    </>
                ))
            }
            </Row>
            <Row style={{textAlign:'center', padding: '10px'}}>
                <Col>
                    <Button onClick={submitForm}>Submit</Button>
                </Col>
            </Row>
        </Thumbnail>
    )
};