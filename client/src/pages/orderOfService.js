import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
    text-align: center;
    margin: 0 10%;
    width: 80%;
`;

export default function OrderOfService() {
    return (
        <Page>
            <h3>Getting There</h3>
            Our wedding ceremony and reception will be held at Hensol Castle.  The castle is
            on the grounds of the Vale Resort, guests staying at the hotel will be able to use the 
            hotel's shuttle service to and from the castle.  There is free parking available on the
            castle grounds for those not staying at the Vale Resort.
            <br />
            <br />
            <u>Hensol Castle</u><br />
            Hensol, Pontyclun, CF72 8JX<br/>
            <br />
            <u>The Vale Resort</u><br />
            Hensol Park, Pontyclun, CF72 8JY<br/>
        
            <h3>The Night Before</h3>
            With many of our guests staying at the hotel the night before the wedding and arriving from out of town, we have booked 
            a room in the Vale Resort as a meeting point.  The room is booked from 7.30pm if you wish to join us for a drink, all are welcome!
        </Page>
    );
}

