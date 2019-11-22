import React from 'react';
import { Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';

import HotelList from '../contexts/Hotels.json';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';

const Page = styled.div`
    text-align: center;
    margin: 0 10%;
    width: 80%;
`;

const HotelContainer = styled.div`
    text-align: center;
    z-index: 1;
    background: #fff;
    border-radius: 0 0 .25rem .25rem;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    margin: 2%;
    padding: unset !important;

    h1, h2, h3, h4, h5 {
        font-family: 'RNS_Camelia';
    }

    img {
        box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
        width: 100%;
        vertical-align: middle;
    }
`;

const TextContent = styled.div`
    padding: 4%;
`;

export default function Hotels() {
    return (
        <Page data-id='hotels-page'>
            <p>
                For those who wish to stay near by the closest two hotels are listed below
            </p>
            <Row>
                {
                    HotelList.map(({name, text, url, address, postcode, image}, key) => (
                        <Col key={key} xs={12} sm={12} md={12} lg={6}>
                            <HotelContainer className="hotel_container">
                                <Image src={require(`../images/${image}`)} rounded />
                                <TextContent>
                                    <h5 data-id='hotel-name'>{name}</h5>
                                    <p data-id='hotel-address'>{address}</p>
                                    <p>{postcode}</p>
                                    <div data-id='hotel-distance'>{text}</div>
                                    <Button className="btn-secondary" data-id='hotel-url' onClick={() => window.open(url, '_blank') }>Book Online</Button>
                                </TextContent>
                            </HotelContainer>
                        </Col>
                    ))
                }
            </Row>
        </Page>
    );
}