import React from 'react';
import Navbar from '../components/navbar';

export default function OrderOfService() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <p>
                    <b>12.45 - 13.15</b><br />
                    Arrival Drinks<br />
                    <b>13.15 - 13.30<br /></b>
                    Please take your seats<br />
                    <b>13.30 - 14.00<br /></b>
                    Ceremony<br />
                    <b>14.00 - 16.00<br /></b>
                    Fizz & Photos<br />
                    <b>16.00 - 18.30<br /></b>
                    Speeches & Dinner<br />
                    <b>18.40<br /></b>
                    Cake Cutting<br />
                    <b>19.00<br /></b>
                    Evening Guests Arrival<br />
                    <b>19.30<br /></b>
                    First Dance<br />
                    <b>20.30<br /></b>
                    Dinner is Served<br />
                    <b>20.30 - 01.00<br /></b>
                    Dancing<br />
                    <b>01.00<br /></b>
                    Hometime<br />
                </p>
            </div>
        </div>
    );
}

