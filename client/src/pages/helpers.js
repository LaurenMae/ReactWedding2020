import _ from 'lodash';

const urlDefault = window.location.host.replace('3000', '3001');
const apiUrl = _.get(process.env, 'REACT_APP_API_URL', `http://${urlDefault}`);

export const getHotelBookings = async (firstName, lastName) => {
    try {
        const guestRooms = await fetch(`${apiUrl}/api/hotelBooking/${firstName}/${lastName}`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sheetName: 'Guest Rooms',
                sheetRange: 'A2:G25'
            })
        });

        return guestRooms.json();
    } catch (err) {
        console.error('Error getting hotel bookings', err);
        throw err;
    }
};

export const rsvp = async (body) => {
    try {
        const resp = await fetch(`${apiUrl}/api/rsvp`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        return resp;
    } catch (err) {
        console.error('Error during rsvp', err);
        throw err;
    }
};

export const getRsvpForGuest = (guestList, rsvpList, firstName, lastName) => {
    const guest = _.find(guestList, { firstName: firstName.toLowerCase().trim(), lastName: lastName.toLowerCase().trim() });
    
    if (_.isUndefined(guest)) {
        return `Sorry, ${_.startCase(`${firstName} ${lastName}`)}, you don't seem to be on the guest list.  Double check your name is entered correctly, if this issue continues contact us - Lauren 07772985769 or Jamie 07805375826`;
    }

    const existingRsvp = _.find(rsvpList, { firstName: firstName.toLowerCase().trim(), lastName: lastName.toLowerCase().trim() });
    
    if (existingRsvp) {
        return `Sorry, ${_.startCase(`${firstName} ${lastName}`)}, we already have your response.  If you need to change your response, or think there is an issue, contact us - Lauren 07772985769 or Jamie 07805375826`;
    } 

    return guest;
};

export const getGuestList = async () => {
    try {
        const resp = await fetch(`${apiUrl}/api/getGuestList`, {
            method: 'get',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        });

        return resp.json();
    } catch (err) {
        console.error('Error getting guest list', err);
        throw err;
    }
};

export const getRsvpList = async () => {
    try {
        const resp = await fetch(`${apiUrl}/api/getRsvpList`, {
            method: 'post',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sheetName: 'rsvp',
                sheetRange: 'A2:G250'
            })
        });

        return resp.json();
    } catch (err) {
        console.error('Error getting rsvp list', err);
        throw err;
    }
};