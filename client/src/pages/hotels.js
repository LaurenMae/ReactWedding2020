import React from 'react';
import { Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';

import HotelList from '../contexts/Hotels.json';
import { Image } from 'react-bootstrap';
import './hotels.scss';

export default function Hotels() {
    return (
        <div data-id='hotels-page'>
            <p>
                For those who wish to stay near by the closest two hotels are listed below
            </p>
            <Row>
                {
                    HotelList.map(({name, text, url, address, postcode, image}, key) => (
                        <Col key={key} xs={12} sm={12} md={12} lg={6}>
                            <div className="hotel_container">
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
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}