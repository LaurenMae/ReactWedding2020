import React from 'react';
import DateCountdown from 'react-date-countdown-timer';
import { Container } from 'reactstrap';

import './home.scss';

export default function Home() {
    return (
        <>
            <Container className="countdown">
                <h3>COUNT DOWN TO THE BIG DAY</h3>
                <DateCountdown dateTo='June 27, 2020 13:30:00 GMT+01:00'
                    mostSignificantFigure="day"
                    callback={()=>alert('The day is here')} />
            </Container>

            Some nonsense to waste the space and give info
       </>
    );
}

