import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import ImageThumbnail from '../components/ImageThumbnail';
import Destinations from '../contexts/HoneymoonStops.json';

import './gifts.scss';

export default function Gifts() {
    return (
        <Container>
            <p>
            We know it’s traditional to write a list <br />
            But in this case there is a slight twist<br />
            Our home is complete with the usual stuff<br />
            And the things that we have are good enough<br />
            Our dream is to honeymoon in a foreign land<br />
            And walk along the beach hand in hand<br />
            We hope you don’t think of us as being rude<br />
            And that our request is not misconstrued<br />
            But a contribution to our honeymoon pot<br />
            Would be appreciated such a lot<br />
            But the most important thing to say<br />
            Is that you are there to celebrate our day!
                
                {/* TODO Reword this */}
            </p>
            <h3>
                Our Honeymoon plans
            </h3>
            <Row>
                {
                    Destinations.map(({ image, placeName, details }, key) => (
                        <Col key={key} xs={12} sm={6} md={3} lg={3}>
                            <ImageThumbnail image={image}>
                                <h4>{placeName}</h4>
                                <p>{details}</p>
                            </ImageThumbnail>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}

