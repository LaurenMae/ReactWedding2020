import React from 'react';
import Navbar from '../components/navbar';

import HotelList from '../contexts/Hotels.json';
import { Blurb2Context } from '../Context';

import Blurb2 from '../components/blurb2';

export default function Details() {
    return (
        <div>
            <Navbar />
            <div style={{display: 'inline-block'}}>
                <p>
                    We have chosen a few hotels near the venue for our guests. <br />
                    There is no obligation but we thought it would be helpful for those who do not know the area.
                </p>
                <div style={{display: 'flex'}}>
                    {
                        HotelList.Hotels.map((hotel, key) => {
                            return (
                                <Blurb2Context.Provider value={hotel} key={key}>
                                    <Blurb2 />
                                </Blurb2Context.Provider>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}