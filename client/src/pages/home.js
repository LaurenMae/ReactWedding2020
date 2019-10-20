import React from 'react';
import Countdown from '../components/Countdown';
import { Container } from 'reactstrap';
import { Image } from 'react-bootstrap';

import './home.scss';

export default function Home() {
    return (
        <Container data-id='home-page' style={{ textAlign: 'center' }}>
            <Image src={require(`../images/hensol.jpg`)} rounded style={{ height: '50vh' }} />
            <Countdown title='COUNT DOWN TO THE BIG DAY' dateTo='June 27, 2020 13:30:00 GMT+01:00' mostSignificantFigure="day" />

            Some nonsense to waste the space and give info
       </Container>
    );
}

