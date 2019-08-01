import React from 'react';
import DateCountdown from 'react-date-countdown-timer';
import Hensol from '../images/hensol.jpg';

import './home.scss';

export default function Home() {
    return (
        <div className="countdown">
            <img src={Hensol} width="100%"/>
            <div className="centered">
                <p>COUNT DOWN TO THE BIG DAY</p>
                <DateCountdown dateTo='June 27, 2020 13:30:00 GMT+01:00'
                    mostSignificantFigure="day"
                    callback={()=>alert('The day is here')} />
            </div>
        </div>
    );
}

