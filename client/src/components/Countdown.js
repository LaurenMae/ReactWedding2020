import React from 'react';
import DateCountdown from 'react-date-countdown-timer';
import { Container } from 'reactstrap';

import './countdown.scss';

export default function Countdown({ title, dateTo, mostSignificantFigure }) {
    return (
        <Container className="countdown">
            <h3>{title}</h3>
            <DateCountdown dateTo={dateTo}
                mostSignificantFigure={mostSignificantFigure} />
        </Container>
    )
}