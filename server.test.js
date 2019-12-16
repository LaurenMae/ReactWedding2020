const app = require('./server');
const supertest = require('supertest');
const sheetsHelper = require('./helpers/sheetsHelper'); 
const emailHelper = require('./helpers/emailHelper');

app.listen(3000, function() {
    console.log(`listening on 3000`);
});

const request = supertest(app);
const consoleError = console.error;

jest.mock('./helpers/sheetsHelper');
jest.mock('./helpers/emailHelper');

describe('server', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        console.error = jest.fn();
    });
    
    afterEach(() => {
        console.error = consoleError;
    });

    describe('POST /api/rsvp', () => {
        const mockUpdate = jest.fn();
        const mockSendEmail = jest.fn();

        beforeEach(() => {
            sheetsHelper.update = mockUpdate;
            emailHelper.sendEmail = mockSendEmail;
        });

        describe('Spreadsheet updates and email sends', () => {
            it('should return 200 status', async () => {
                mockUpdate.mockResolvedValue({});
                mockSendEmail.mockResolvedValue({ messageId: '1234' });

                const body = {
                    values: {
                        attendance: 'attending',
                        firstName: 'jamie',
                        lastName: 'morris',
                        email: 'morris@email.com',
                        phone: '012345678910',
                        diet: 'veggie',
                        song: 'songname'
                    }
                };

                const expectedSpreadsheetValues = [
                    [
                        'attending',
                        'jamie',
                        'morris',
                        'morris@email.com',
                        '012345678910',
                        'veggie',
                        'songname'
                    ]
                ];

                const response = await request.post('/api/rsvp/').send(body);

                expect(response.status).toStrictEqual(200);
                expect(mockUpdate).toHaveBeenCalledWith(expectedSpreadsheetValues, body);
                expect(mockSendEmail).toHaveBeenCalledWith(`RSVP, ${body.name}`, JSON.stringify(body));
            });
        });

        describe('Spreadsheet updates successfully, confirmation email fails', () => {
            it('should return 500 status', async () => {
                const mockEmailError = new Error('Expected email error');

                mockUpdate.mockResolvedValue({});
                mockSendEmail.mockRejectedValue(mockEmailError);

                const body = {
                    values: {
                        attendance: 'attending',
                        firstName: 'jamie',
                        lastName: 'morris',
                        email: 'morris@email.com',
                        phone: '012345678910',
                        diet: 'veggie',
                        song: 'songname'
                    }
                };

                const expectedSpreadsheetValues = [
                    [
                        'attending',
                        'jamie',
                        'morris',
                        'morris@email.com',
                        '012345678910',
                        'veggie',
                        'songname'
                    ]
                ];

                const response = await request.post('/api/rsvp/').send(body);

                expect(response.status).toStrictEqual(500);
                expect(mockUpdate).toHaveBeenCalledWith(expectedSpreadsheetValues, body);
                expect(mockSendEmail).toHaveBeenCalledWith(`RSVP, ${body.name}`, JSON.stringify(body));
            });
        });

        describe('Spreadsheet update fails', () => {
            it('should return 500 status', async () => {
                const mockSpreadsheetError = new Error('Expected spreadsheet error');
                
                mockUpdate.mockRejectedValue(mockSpreadsheetError);
                
                const body = {
                    values: {
                        attendance: 'attending',
                        firstName: 'jamie',
                        lastName: 'morris',
                        email: 'morris@email.com',
                        phone: '012345678910',
                        diet: 'veggie',
                        song: 'songname'
                    }
                };

                const expectedSpreadsheetValues = [
                    [
                        'attending',
                        'jamie',
                        'morris',
                        'morris@email.com',
                        '012345678910',
                        'veggie',
                        'songname'
                    ]
                ];

                const response = await request.post('/api/rsvp/').send(body);

                expect(response.status).toStrictEqual(500);
                expect(mockUpdate).toHaveBeenCalledWith(expectedSpreadsheetValues, body);
                expect(mockSendEmail).not.toHaveBeenCalled();
            });
        });
    });

    describe('POST /api/getRsvpList', () => {
        const mockReturnSheet = jest.fn();

        beforeEach(() => {
            sheetsHelper.returnSheet = mockReturnSheet;
        });

        describe('Sheet request succeeds', () => {
            it('should return first and last names of RSVP guests', async () => {
                mockReturnSheet.mockResolvedValue([
                    [ 'attending', 'Jamie', 'Morris', 'morris@email.com', '012345']
                ]);

                const body = {
                    sheetName: 'sheetName',
                    sheetRange: 'sheet!A1:Z1'
                };

                const response = await request.post('/api/getRsvpList').send(body);

                expect(response.text).toStrictEqual(JSON.stringify([
                    {
                        firstName: 'jamie',
                        lastName: 'morris'
                    }
                ]));
            });
        });

        describe('Sheet request fails', () => {
            it('should return 500 status', async() => {
                const mockSheetError = new Error('Expected sheet error');
                mockReturnSheet.mockRejectedValue(mockSheetError);

                const body = {
                    sheetName: 'sheetName',
                    sheetRange: 'sheet!A1:Z1'
                };

                const resp = await request.post('/api/getRsvpList').send(body);
                expect(resp.status).toStrictEqual(500);
                
            });
        });
    });

    describe('POST /api/hotelBooking/:firstName/:lastName', () => {
        const mockReturnSheet = jest.fn();

        beforeEach(() => {
            sheetsHelper.returnSheet = mockReturnSheet;
        });

        describe('Sheet request succeeds', () => {
            it('should return hotel booking for user', async () => {
                mockReturnSheet.mockResolvedValue([
                    [ '25/11/2020', 'Double', 'Jamie Morris', '£100', '£50', '£50', '25/10/2020'],
                    [ '25/11/2020', 'Double', 'Tim Morris', '£100', '£0', '£100', '25/10/2020'],
                    [ '25/11/2020', 'Double', 'Sam Morris', '£200', '£50', '£150', '25/10/2020']
                ]);

                const body = {
                    sheetName: 'sheetName',
                    sheetRange: 'sheet!A1:Z1'
                };

                const expectedResponse = {
                    dates: '25/11/2020',
                    roomType: 'Double',
                    name: 'Jamie Morris',
                    cost: '£100',
                    paid: '£50',
                    outstanding: '£50',
                    due: '25/10/2020'
                }

                const response = await request.post('/api/hotelBooking/Jamie/Morris').send(body);

                expect(response.text).toStrictEqual(JSON.stringify(expectedResponse));
            });
        });

        describe('Sheet request fails', () => {
            it('should return 500 status', async () => {
                const mockSheetError = new Error('Expected sheet error');
                mockReturnSheet.mockRejectedValue(mockSheetError);

                const body = {
                    sheetName: 'sheetName',
                    sheetRange: 'sheet!A1:Z1'
                };

               const resp = await request.post('/api/hotelBooking/Jamie/Morris').send(body);
               expect(resp.status).toStrictEqual(500);
            });
        });
    });

    describe('GET /api/getGuestList', () => {
        const mockReturnSheet = jest.fn();

        beforeEach(() => {
            sheetsHelper.returnSpreadsheet = mockReturnSheet;
        });

        describe('Sheet request succeeds', () => {
            it('should return sheet content', async () => {
                const fakeSheetContent = [
                    [ '25/11/2020', 'Double', 'Jamie Morris', '£100', '£50', '£50', '25/10/2020'],
                    [ '25/11/2020', 'Double', 'Tim Morris', '£100', '£0', '£100', '25/10/2020'],
                    [ '25/11/2020', 'Double', 'Sam Morris', '£200', '£50', '£150', '25/10/2020']
                ];
                
                mockReturnSheet.mockResolvedValue(fakeSheetContent);

                const response = await request.get('/api/getGuestList');

                expect(response.text).toStrictEqual(JSON.stringify(fakeSheetContent));
            });
        });

        describe('Sheet request fails', () => {
            it('should return 500 status', async () => {
                const mockSheetError = new Error('Expected sheet error');
                mockReturnSheet.mockRejectedValue(mockSheetError);

                const resp = await request.get('/api/getGuestList');
                expect(resp.status).toStrictEqual(500);
            });
        });
    });
});