import React from 'react';
import { 
    Button,
    Input,
    FormGroup,
    Label,
    Row,
    Col
} from 'reactstrap';
import Thumbnail from '../components/Thumbnail';

export default function RsvpForm({ submit, values, setValues }) {
    const handleInputChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    return (
        <Thumbnail>
            <Row style={{textAlign:'center', padding: '10px', display: 'block'}}>
                Please enter your name below <br />
                Each named guest will need to RSVP separately
            </Row>
            <Row style={{textAlign:'center', padding: '10px'}}>
                <Col>
                    <FormGroup style={{ textAlign: 'left' }} row>
                        <Col xs={12} sm={12} md={12} lg={2}>
                            <Label>First Name</Label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={10}>
                            <Input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleInputChange}/>
                        </Col>
                    </FormGroup>
                </Col>
            </Row>
                <Row style={{textAlign:'center', padding: '10px'}}>
                <Col>
                    <FormGroup style={{ textAlign: 'left' }} row>
                        <Col xs={12} sm={12} md={12} lg={2}>
                            <Label>Last Name</Label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={10}>
                            <Input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleInputChange}/>
                        </Col>
                    </FormGroup>
                </Col>
            </Row>
            <Row style={{textAlign:'center', padding: '10px'}}>
                <Col>
                    <Button onClick={submit}>RSVP</Button>
                </Col>
            </Row>
        </Thumbnail>);
}