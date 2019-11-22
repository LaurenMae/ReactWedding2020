import React from 'react';
import Countdown from '../components/Countdown';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';

const Page = styled.div`
    text-align: center;

    img {
        max-height: 350px;
        max-width: 612px;
        height: 50vw;
    }
`;

export default function Home() {
    return (
        <Page data-id='home-page'>
            <Image src={require(`../images/hensol.jpg`)} rounded />
            <Countdown title='Count Down to the Big Day' dateTo='June 27, 2020 13:30:00 GMT+01:00' mostSignificantFigure="day" />
       </Page>
    );
}

