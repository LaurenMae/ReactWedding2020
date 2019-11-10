import React, { useState, useEffect } from 'react';
import { 
    Button,
    Input,
    FormGroup,
    Label,
    FormFeedback,
    Row,
    Col
} from 'reactstrap';
import _ from 'lodash';
import Thumbnail from '../components/Thumbnail';
import Done from '@material-ui/icons/Done';

import './inviteRsvp.scss';
import rsvpFormEntries from './rsvpEntries.json';

const urlDefault = window.location.host.replace('3000', '3001');
const apiUrl = _.get(process.env, 'REACT_APP_API_URL', `http://${urlDefault}`);

export default function InviteRsvp({ history }) {
    const [values, setValues] = useState(history.location.state);
    const [error, setError] = useState();
    const [radioValues, setRadioValues] = useState();
    const [noneRadioValues, setNoneRadioValues] = useState();

    useEffect(() => {
        setRadioValues(rsvpFormEntries.filter(entry => entry.type === 'radio'));
        setNoneRadioValues(rsvpFormEntries.filter(entry => entry.type !== 'radio'));
    }, []);
    
    const toggle = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.attributes.name.nodeValue]: event.target.attributes.value.nodeValue}));
    };

    // eslint-disable-next-line no-unused-vars
    const handleInputChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    const submitForm = (event) => {
        event.preventDefault();

        if (!values.email.trim() && !values.phone.trim()) {
            setError('You need to provide an email address or phone number');
        } else {
            update();
        }        
    };

    const update = async () => {
        await fetch(`${apiUrl}/api/rsvp`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });

        history.push(`/RSVP/${values.firstName}${values.lastName}/thankyou`, { email: values.email, attendance: values.attendance });
    };

    return (
        <Thumbnail style={{ padding: '10px', width: '80%' }}>
            <Row style={{textAlign:'center', padding: '10px'}}>
                <Col>
                    <div>{_.startCase(`${values.firstName} ${values.lastName}`)}, please complete the form below to RSVP</div>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
            {
                radioValues && radioValues.map(({onChange, ...entry}) => {
                    return entry.options.map(({ name, value, label }, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <div style={{ display: 'inline-flex' }}>
                                <div style={{ border: '1px solid rgba(0,0,0,.5)', width: '30px', height: '30px', margin: '0 10px' }}
                                    name={name}
                                    value={value}
                                    onClick={toggle}
                                >
                                    <Done style={{ visibility: values.attendance === value ? 'visible' : 'hidden' }} />
                                </div>
                                <div style={{ lineHeight: 2 }}>{label}</div>
                            </div>
                        </Col>
                    ))
                })
            }
            </Row>
            {
                noneRadioValues && noneRadioValues.map(({onChange, validate, value, label, ...props}, index) => (
                    <Row key={index}>
                        <Col>
                            <FormGroup style={{ textAlign: 'left' }} row>
                                <Col xs={12} sm={12} md={12} lg={2}>
                                    <Label for="exampleEmail">{label}</Label>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={10}>
                                    {/* eslint-disable-next-line no-eval */}
                                    <Input invalid={error && validate} {...props} value={eval(value)} onChange={eval(onChange)} />
                                    <FormFeedback invalid={error}>{error}</FormFeedback>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                ))
            }
            <Row style={{textAlign:'center', padding: '10px'}}>
                <Col>
                    <Button onClick={submitForm}>Submit</Button>
                </Col>
            </Row>
        </Thumbnail>
    )
};