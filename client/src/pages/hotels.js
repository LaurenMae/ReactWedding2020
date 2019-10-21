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
                                <h4 data-id='hotel-name'>{name}</h4>
                                <p data-id='hotel-address'>{address}</p>
                                <p>{postcode}</p>
                                <div data-id='hotel-distance'>{text}</div>
                                <Button className="btn-secondary" data-id='hotel-url' onClick={() => window.open(url, '_blank') }>Book Online</Button>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}