import React from 'react';
import { Col, Row } from 'reactstrap';
import Destinations from '../contexts/HoneymoonStops.json';
import ImageCarousel from '../components/ImageCarousel';
import styled from 'styled-components';

const Page = styled.div`
    text-align: center;
    margin: 0 10%;
    width: 80%;
`;

const Poem = styled.div`
    text-align: center;
`;

export default function Gifts() {
    return (
        <Page>
            <Row>
                <Col xs={12} sm={12} md={12} lg={7}>
                    <ImageCarousel images={Destinations} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={5}>
                    <Poem>
                        We know it’s traditional to write a list, <br />
                        But in this case there is a slight twist, <br />
                        Our home is complete with the usual stuff, <br />
                        And the things that we have are good enough, <br />
                        Our dream is to honeymoon in a foreign land, <br />
                        And walk along the beach hand in hand, <br />
                        We hope you don’t think of us as being rude, <br />
                        And that our request is not misconstrued, <br />
                        But a contribution to our honeymoon pot, <br />
                        Would be appreciated such a lot, <br />
                        But the most important thing to say, <br />
                        Is that you are there to celebrate our day! <br />
                        <span className='fancy-font' style={{ textAlign: 'center', fontSize: '3rem' }}>Lauren & Jamie</span>
                    </Poem> 
                </Col>
            </Row> 
        </Page>
    );
}

