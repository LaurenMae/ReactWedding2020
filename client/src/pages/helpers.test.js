global.fetch = require('jest-fetch-mock');

import { 
    getHotelBookings,
    rsvp,
    getRsvpForGuest,
    getGuestList,
    getRsvpList
} from './helpers';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('helpers', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    describe('getHotelBookings', () => {
        it('should return the room details', async () => {
            const guestRooms = {
                dates: '',
                roomType: '',
                name: '',
                cost: '',
                paid: '',
                outstanding: '',
                due: ''
            };

            fetch.mockResponseOnce(JSON.stringify(guestRooms));
            const resp = await getHotelBookings('Jamie', 'Morris');
            expect(resp).toStrictEqual(guestRooms);
        });

        it('should throw an error', async () => {
            const expectedError = new Error('Expected error');
            fetch.mockRejectOnce(expectedError);
            
            await expect(getHotelBookings('Jamie', 'Morris')).rejects.toEqual(expectedError);
        });
    });

    describe('rsvp', () => {
        it('should not error', async () => {
            const body = { 
                values: {},
                hotels: {}
            };

            fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
            const resp = await rsvp(body);
            expect(resp.status).toStrictEqual(200);
        });

        it('should throw an error', async () => {
            const expectedError = new Error('Expected error');
            fetch.mockRejectOnce(expectedError);
            
            const body = { 
                values: {},
                hotels: {}
            };

            await expect(rsvp(body)).rejects.toEqual(expectedError);
        });
    });

    describe('getRsvpForGuest', () => {
        it('should return correct guest when guest exists, no existing rsvp', () => {
            const guestList = [
                {
                    firstName: 'jamie',
                    lastName: 'owen'
                },
                {
                    firstName: 'lauren',
                    lastName: 'mae'
                }
            ];

            const rsvpList = [];

            const guest = getRsvpForGuest(guestList, rsvpList, 'Jamie', 'owen');
            expect(guest).toStrictEqual(guestList[0]);
        });

        it('should return null when guest does not exist', () => {
            const guestList = [
                {
                    firstName: 'lauren',
                    lastName: 'mae'
                }
            ];

            const rsvpList = [];

            const guest = getRsvpForGuest(guestList, rsvpList, 'Jamie', 'owen');
            expect(guest).toStrictEqual(null);
        });

        it('should return null when guest exists and has an existing rsvp', () => {
            const guestList = [
                {
                    firstName: 'jamie',
                    lastName: 'owen'
                },
                {
                    firstName: 'lauren',
                    lastName: 'mae'
                }
            ];

            const rsvpList = [
                {
                    firstName: 'jamie',
                    lastName: 'owen'
                }
            ];

            const guest = getRsvpForGuest(guestList, rsvpList, 'Jamie', 'owen');
            expect(guest).toStrictEqual(null);
        });
    });

    describe('getGuestList', () => {
        it('should return the guestList', async () => {
            const guestList = [
                {
                    firstName: 'jamie',
                    lastName: 'owen'
                },
                {
                    firstName: 'lauren',
                    lastName: 'mae'
                }
            ];

            fetch.mockResponseOnce(JSON.stringify(guestList));
            const resp = await getGuestList();
            expect(resp).toStrictEqual(guestList);
        });

        it('should throw an error', async () => {
            const expectedError = new Error('Expected error');
            fetch.mockRejectOnce(expectedError);
            await expect(getGuestList()).rejects.toEqual(expectedError);
        });
    });

    describe('getRsvpList', () => {
        it('should return the rsvpList', async () => {
            const rsvpList = [
                {
                    firstName: 'jamie',
                    lastName: 'owen'
                },
                {
                    firstName: 'lauren',
                    lastName: 'mae'
                }
            ];

            fetch.mockResponseOnce(JSON.stringify(rsvpList));
            const resp = await getRsvpList();
            expect(resp).toStrictEqual(rsvpList);
        });

        it('should throw an error', async () => {
            const expectedError = new Error('Expected error');
            fetch.mockRejectOnce(expectedError);
            await expect(getRsvpList()).rejects.toEqual(expectedError);
        });
    });
});
