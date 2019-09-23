import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import ImageThumbnail from '../components/ImageThumbnail';
import Destinations from '../contexts/HoneymoonStops.json';

import './gifts.scss';

export default function Gifts() {
    return (
        <Container>
            <p>
                If you wished to give a gift, we would request contributions towards our honeymoon. We are
                really excited about our trip!
                
                {/* TODO Reword this */}
            </p>
            <h3>
                Our Honeymoon plans
            </h3>
            <Row>
                {
                    Destinations.map(({ image, placeName }, key) => (
                        <Col key={key} xs sm md lg>
                            <ImageThumbnail image={image}>
                                <h4>{placeName}</h4>
                            </ImageThumbnail>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}

