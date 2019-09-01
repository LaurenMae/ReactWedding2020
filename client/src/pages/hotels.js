import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { navigate } from '@reach/router';

import HotelList from '../contexts/Hotels.json';
import './hotels.scss';

export default function Hotels() {
    return (
        <Container>
            We have chosen a few hotels near the venue for our guests
            There is no obligation but we thought it would be helpful for those who do not know the area
            <Row>
                {
                    HotelList.Hotels.map(({name, text, url, address, postcode}, key) => (
                        <Col className="detail_container" key={key} xs={12} sm md lg>
                            <h3>{name}</h3>
                            <h4>{address}</h4>
                            <h4>{postcode}</h4>
                            <div>{text}</div>
                            <Button onClick={() => navigate(url)}>Book Online</Button>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}