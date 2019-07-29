import React from 'react';
import Navbar from '../components/navbar';

export default function OrderOfService() {
    return (
        <div>
            <Navbar />
            <div>
                <h3>1:15pm</h3>
                Please take your seats
                <h3>1:30pm</h3>
                Ceremony
                <h3>2:00pm</h3>
                Fizz & Photos
                <h3>4:00pm</h3>
                Speeches & Dinner
                <h3>7.30pm</h3>
                First Dance
                <h3>8:30pm</h3>
                Dinner is Served
                <h3>1:00am</h3>
                Hometime
            </div>
        </div>
    );
}

