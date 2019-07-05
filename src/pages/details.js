import React from 'react';
import Navbar from '../components/navbar';

import HotelList from '../contexts/Hotels.json';
import { BlurbContext } from '../Context';

import Blurb from '../components/blurb';

export default function Details() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <b>Hotels & Parking</b>
                <div>
                    {
                        HotelList.Hotels.map((hotel, key) => {
                            return (
                                <BlurbContext.Provider value={hotel} key={key}>
                                    <Blurb />
                                </BlurbContext.Provider>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}