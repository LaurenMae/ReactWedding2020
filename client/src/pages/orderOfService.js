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
            on the grounds of the Vale Hotel, guests staying at the hotel will be able to use the 
            hotel's shuttle service to and from the castle.  There is free parking available on the
            castle grounds for those not staying at the Vale Hotel.
            <br />
            <br />
            <u>Hensol Castle & The Vale Hotel:</u><br/>
            Hensol, Pontyclun, CF72 8JX<br/>
            <br />

            If you are driving to Hensol Castle follow satnav directions to The Vale Hotel,
            once you arrive at the turning for the Vale hotel continue driving past a small row of houses,
            after these houses turn left and go across the gated bridge into Hensol Castle grounds
            (the Castle is sign posted but the trees may obscure the signs)

            <h3>Staying There</h3>
            If you wish to stay at the Vale Hotel, and have not already booked a room,
            please contact the hotel directly. You can book online via their website or by calling reservations 01443 667800
        
            <h3>The Night Before</h3>
            With many of our guests staying at the hotel the night before the wedding and arriving from out of town, we have booked 
            a room in the Vale Hotel as a meeting point.  The room is booked from 6pm if you wished to join us for a drink all are welcome!
        </Page>
    );
}

