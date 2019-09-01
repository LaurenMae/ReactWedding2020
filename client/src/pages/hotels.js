import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { navigate } from '@reach/router';

import HotelList from '../contexts/Hotels.json';
import './hotels.scss';

export default function Hotels() {
    return (
        <Container data-id='hotels-page'>
            <p>
                We have chosen a few hotels near the venue for our guests
                There is no obligation but we thought it would be helpful for those who do not know the area
            </p>
            <Row>
                {
                    HotelList.map(({name, text, url, address, postcode}, key) => (
                        <Col className="hotel_container" key={key} xs={12} sm md lg>
                            <h3 data-id='hotel-name'>{name}</h3>
                            <h4 data-id='hotel-address'>{address}</h4>
                            <h4>{postcode}</h4>
                            <div data-id='hotel-distance'>{text}</div>
                            <a data-id='hotel-url' target='_blank' href={url} type='button'>Book Online</a>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}