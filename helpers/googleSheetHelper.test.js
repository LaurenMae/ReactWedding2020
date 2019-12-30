import { google } from 'googleapis';
import helpers from './googleSheetsHelper';

jest.mock('googleapis');

const mockGet = jest.fn();
const mockAppend = jest.fn();

const fakeSheetsInstance = {
    spreadsheets: {
        test: 'fake sheet',
        values: {
            get: mockGet,
            append: mockAppend
        }
    }
};

google.sheets.mockReturnValue(fakeSheetsInstance);

const consoleError = console.error;

describe('googleSheetsHelper', () => {
    beforeEach(() => {
        console.error = jest.fn();
    });

    afterEach(() => {
        console.error = consoleError;
    });

    describe('retrieveSheet', () => {
        it('should make GET request to googleapi with correct vars', async () => {
            const jwtClient = 'fakeClient';
            const sheetId = '12345';
            const name = 'sheetName';
            const range = 'A2:D2';

            mockGet.mockResolvedValue({ data: { values: [] } });

            await helpers.retrieveSheet(jwtClient, sheetId, name, range);
            expect(mockGet).toHaveBeenCalledWith({
                auth: jwtClient,
                spreadsheetId: sheetId,
                range: `${name}!${range}`
            });
        });

        it('should return the data values from response', async () => {
            const jwtClient = 'fakeClient';
            const sheetId = '12345';
            const name = 'sheetName';
            const range = 'A2:D2';

            const expectedValues = { data: { values: [] } };
            mockGet.mockResolvedValue(expectedValues);

            const values = await helpers.retrieveSheet(jwtClient, sheetId, name, range);
            expect(values).toStrictEqual(expectedValues.data.values);
        });

        it('should handle errors', async () => {
            const jwtClient = 'fakeClient';
            const sheetId = '12345';
            const name = 'sheetName';
            const range = 'A2:D2';

            const mockError = new Error('Expected Error')
            mockGet.mockRejectedValue(mockError);
            expect(helpers.retrieveSheet(jwtClient, sheetId, name, range)).rejects.toEqual(mockError);
        });
    });

    describe('retrieveAndPrintSheet', () => {
        it('should make GET request to googleapi with correct vars', async () => {
            const jwtClient = 'fakeClient';
            const sheetId = '12345';
            const name = 'sheetName';
            const range = 'A2:D2';

            mockGet.mockResolvedValue({ data: { values: [] } });

            await helpers.retrieveAndPrintSheet(jwtClient, sheetId, name, range);
            expect(mockGet).toHaveBeenCalledWith({
                auth: jwtClient,
                spreadsheetId: sheetId,
                range: `${name}!${range}`
            });
        });

        it('should return the data values from response', async () => {
            const jwtClient = 'fakeClient';
            const sheetId = '12345';
            const name = 'sheetName';
            const range = 'A2:D2';

            const mockResponse = { 
                data: { 
                    values: [
                        ['Jamie', 'Morris', 'morris@email.com', 'veggie']
                    ]
                }
            };

            mockGet.mockResolvedValue(mockResponse);

            const expectedValues = [
                {
                    firstName: 'jamie',
                    lastName: 'morris'
                }
            ];

            const values = await helpers.retrieveAndPrintSheet(jwtClient, sheetId, name, range);
            expect(values).toStrictEqual(expectedValues);
        });

        it('should handle errors', async () => {
            const jwtClient = 'fakeClient';
            const sheetId = '12345';
            const name = 'sheetName';
            const range = 'A2:D2';

            const mockError = new Error('Expected Error')
            mockGet.mockRejectedValue(mockError);
            expect(helpers.retrieveAndPrintSheet(jwtClient, sheetId, name, range)).rejects.toEqual(mockError);
        });
    });

    describe('updateAndPrintSheet', () => {
        it('should make APPEND request to googleapi with correct vars', async () => {
            const jwtClient = 'fakeClient';
            const sheetId = '12345';
            const values = [
                ['Jamie', 'Morris', 'morris@email.com']
            ];

            await helpers.updateAndPrintSheet(jwtClient, sheetId, values);
            expect(mockAppend).toHaveBeenCalledWith({
                auth: jwtClient,
                spreadsheetId: sheetId,
                range: 'rsvp!A2:D2',
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values
                }
            });
        });

        it('should handle errors', async () => {
            const jwtClient = 'fakeClient';
            const sheetId = '12345';
            const values = [
                ['Jamie', 'Morris', 'morris@email.com']
            ];

            const mockError = new Error('Expected Error')
            mockAppend.mockRejectedValue(mockError);
            expect(helpers.updateAndPrintSheet(jwtClient, sheetId, values)).rejects.toEqual(mockError);
        });
    });
});
