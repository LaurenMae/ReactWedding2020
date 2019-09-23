import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { navigate } from '@reach/router';

import HotelList from '../contexts/Hotels.json';
import { Image } from 'react-bootstrap';
import './hotels.scss';

export default function Hotels() {
    return (
        <Container data-id='hotels-page'>
            <p>
                Something here
            </p>
            <Row>
                {
                    HotelList.map(({name, text, url, address, postcode, image}, key) => (
                        <Col className="hotel_container" key={key} xs sm md lg>
                            <div className='image-container'>
                                <Image src={require(`../images/${image}`)} rounded />
                            </div>
                            <div className='text-container'>
                                <h3 data-id='hotel-name'>{name}</h3>
                                <h4 data-id='hotel-address'>{address}</h4>
                                <h4>{postcode}</h4>
                                <div data-id='hotel-distance'>{text}</div>
                                <Button variant="outline-secondary" data-id='hotel-url' onClick={() => window.open(url, '_blank') }>Book Online</Button>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}