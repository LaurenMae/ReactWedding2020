import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import ImageThumbnail from '../components/ImageThumbnail';
import Destinations from '../contexts/HoneymoonStops.json';

import './gifts.scss';
import ImageCarousel from '../components/ImageCarousel';

export default function Gifts() {
    return (
        <Container>
            <Row>
                <Col>
                    <ImageCarousel images={Destinations} />
                </Col>
                <Col>
                    <p>
                        If you wished to give a gift, we would request contributions towards our honeymoon. We are
                        really excited about our trip!
                        
                        {/* TODO Reword this */}
                    </p> 
                </Col>
            </Row> 
        </Container>
    );
}

