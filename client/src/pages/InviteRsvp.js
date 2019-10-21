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
import Done from '@material-ui/icons/Done';

import './inviteRsvp.scss';
import { rsvpFormEntries } from './rsvpEntries.json';

const urlDefault = window.location.host.replace('3000', '3001');
const apiUrl = _.get(process.env, 'REACT_APP_API_URL', `http://${urlDefault}`);

export default function InviteRsvp({ history }) {
    const [values, setValues] = useState(history.location.state);
    
    const toggle = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.attributes.name.nodeValue]: event.target.attributes.value.nodeValue}));
    };

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
                    <div>{_.startCase(`${values.firstName} ${values.lastName}`)}, please complete the form below to RSVP</div>
                </Col>
            </Row>
            <Row style={{textAlign:'center'}}>
            {
                rsvpFormEntries.map(({onChange, ...entry}, index) => (
                    <>
                        {
                            entry.type === 'radio' &&
                            <div key={index} style={{ padding: '10px', width: '33.3%', display: 'flex', margin: '0 auto' }}>
                                {
                                    entry.options.map(({ name, value, label }) => (
                                        <div style={{ display: 'flex', margin: '2%' }}>
                                            <div style={{ border: '1px solid rgba(0,0,0,.5)' }} name={name} value={value} onClick={toggle}>
                                                <Done  style={{ visibility: values.attendance === value ? 'visible' : 'hidden' }} />
                                            </div>
                                            <div style={{ padding: '2px 0 0 4px' }}>{label}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        {/* TODO get rid of the eval!! */}
                        {
                            entry.type !== 'radio' &&
                            <Col key={index} xs={12} sm={12} md={12} lg={12} style={{ padding: '10px' }}>
                                <InputGroup size="lg">
                                    <InputGroupAddon addonType="prepend">{entry.label}</InputGroupAddon>
                                    <Input style={{textAlign: 'center'}} {...entry} value={eval(entry.value)} onChange={eval(onChange)} />
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