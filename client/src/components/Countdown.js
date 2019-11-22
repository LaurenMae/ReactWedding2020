import React from 'react';
import DateCountdown from 'react-date-countdown-timer';

import './countdown.scss';

export default function Countdown({ title, dateTo, mostSignificantFigure, callback }) {
    return (
        <div className="countdown">
            <h3>{title}</h3>
            <DateCountdown dateTo={dateTo}
                mostSignificantFigure={mostSignificantFigure} callback={callback} />
        </div>
    )
}