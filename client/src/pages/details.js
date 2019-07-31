import React from 'react';
import MyNavbar from '../components/navbar';
import { Button } from 'reactstrap';
import { navigate } from '@reach/router';

import HotelList from '../contexts/Hotels.json';
import './details.scss';

export default function Details() {
    return (
        <div>
            <MyNavbar />
            <div>
                We have chosen a few hotels near the venue for our guests
                There is no obligation but we thought it would be helpful for those who do not know the area
                <div>
                    {
                        HotelList.Hotels.map(({name, text, url, address, postcode}, key) => (
                            <div className="detail_container" key={key}>
                                <h3>{name}</h3>
                                <h4>{address}</h4>
                                <h4>{postcode}</h4>
                                {text}
                                <Button onClick={() => navigate(url)}>Book Online</Button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}