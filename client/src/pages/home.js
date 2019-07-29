import React from 'react';
import Navbar from '../components/navbar';
import DateCountdown from 'react-date-countdown-timer';
import Hensol from '../images/hensol.jpg';

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="countdown" style={{fontSize: '5vw', position: 'relative'}}>
                <img src={Hensol} width="100%"/>
                <div className="centered" style={{padding: '2vw'}}>
                    <p>COUNT DOWN TO THE BIG DAY</p>
                    <DateCountdown dateTo='June 27, 2020 13:30:00 GMT+01:00'
                        mostSignificantFigure="day"
                        callback={()=>alert('The day is here')} />
                </div>
            </div>
        </div>
    );
}
