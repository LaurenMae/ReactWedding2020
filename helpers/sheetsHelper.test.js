const sheetsHelper = require('./sheetsHelper'); 
const emailHelper = require('./emailHelper');
const consoleError = console.error;
const googleSheetsHelper = require('./googleSheetsHelper');

jest.mock('./emailHelper');
jest.mock('./googleSheetsHelper');

beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
});

afterEach(() => {
    console.error = consoleError;
});

describe('sheetsHelper', () => {
    describe('update', () => {
        const mockUpdateSpreadsheet = jest.fn();
        const mockSendConfirmationEmail = jest.fn();
        const mockSendEmail = jest.fn();

        beforeEach(() => {
            sheetsHelper.updateSpreadsheet = mockUpdateSpreadsheet;
            emailHelper.sendConfirmationEmail = mockSendConfirmationEmail;
            emailHelper.sendEmail = mockSendEmail;
        });

        describe('Spreadsheet updates and confirmation email sends', () => {
            it('should return 200 status', async () => {
                mockUpdateSpreadsheet.mockResolvedValue({});
                mockSendConfirmationEmail.mockResolvedValue({});

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

                const spreadsheetValues = [
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

                await sheetsHelper.update(spreadsheetValues, body);

                expect(mockUpdateSpreadsheet).toHaveBeenCalledWith(spreadsheetValues);
                expect(mockSendConfirmationEmail).toHaveBeenCalledWith(body);
            });
        });

        describe('Spreadsheet updates successfully, confirmation email fails', () => {
            it('should return 500 status', async () => {
                const mockEmailError = new Error('Expected email error');
                mockUpdateSpreadsheet.mockResolvedValue({});
                mockSendConfirmationEmail.mockRejectedValue(mockEmailError);

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

                const spreadsheetValues = [
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

                expect(sheetsHelper.update(spreadsheetValues, body)).rejects.toEqual(mockEmailError);
            });
        });

        describe('Spreadsheet update fails', () => {
            it('should return 500 status', async () => {
                const mockSpreadsheetError = new Error('Expected spreadsheet error');
                mockUpdateSpreadsheet.mockRejectedValue(mockSpreadsheetError);

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

                const spreadsheetValues = [
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
                
                expect(sheetsHelper.update(spreadsheetValues, body)).rejects.toEqual(mockSpreadsheetError);
            });
        });
    });

    describe('returnSheet', () => {
        const mockCreateAndConnectJwtClient = jest.fn();
        const mockSendEmail = jest.fn();
        const mockRetrieveSheet = jest.fn();

        beforeEach(() => {
            googleSheetsHelper.createAndConnectJwtClient = mockCreateAndConnectJwtClient;
            emailHelper.sendEmail = mockSendEmail;
            googleSheetsHelper.retrieveSheet = mockRetrieveSheet;
        });

        describe('Connection to Google and retrieves sheet', () => {
            it('should return sheet content', async () => {
                const spreadsheetValues = [
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
                
                mockCreateAndConnectJwtClient.mockResolvedValue({});
                mockRetrieveSheet.mockResolvedValue(spreadsheetValues);

                const response = await sheetsHelper.returnSheet('sheetName', 'sheet!A1:Z1');

                expect(mockCreateAndConnectJwtClient).toHaveBeenCalled();
                expect(mockRetrieveSheet).toHaveBeenCalledWith({}, expect.any(String), 'sheetName', 'sheet!A1:Z1');
                expect(response).toStrictEqual(spreadsheetValues);
            });
        });

        describe('Connection to Google but fails to retrieve sheet', () => {
            it('should throw an error', () => {
                const mockSheetError = new Error('Expected sheet error');

                mockCreateAndConnectJwtClient.mockResolvedValue({});
                mockRetrieveSheet.mockRejectedValue(mockSheetError);

                return sheetsHelper.returnSheet('sheetName', 'sheet!A1:Z1').catch(err => {
                    expect(err).toStrictEqual(mockSheetError);
                    expect(mockSendEmail).toHaveBeenCalled();
                });
            });
        });

        describe('Connection to Google fails', () => {
            it('should throw an error', async () => {
                const mockGoogleError = new Error('Expected google error');

                mockCreateAndConnectJwtClient.mockRejectedValue(mockGoogleError);

                return sheetsHelper.returnSheet('sheetName', 'sheet!A1:Z1').catch(err => {
                    expect(err).toStrictEqual(mockGoogleError);
                    expect(mockSendEmail).toHaveBeenCalled();
                });
            });
        });

        describe('Connection to Google fails and email fails', () => {
            it('should throw an error', async () => {
                const mockGoogleError = new Error('Expected google error');
                const mockEmailError = new Error('Expected email error');

                mockCreateAndConnectJwtClient.mockRejectedValue(mockGoogleError);
                mockSendEmail.mockRejectedValue(mockEmailError);

                return sheetsHelper.returnSheet('sheetName', 'sheet!A1:Z1').catch(err => {
                    expect(err).toStrictEqual(mockGoogleError);
                    expect(mockSendEmail).toHaveBeenCalled();
                });
            });
        });
    });

    describe('returnSpreadsheet', () => {
        const mockCreateAndConnectJwtClient = jest.fn();
        const mockSendEmail = jest.fn();
        const mockRetrieveAndPrintSheet = jest.fn();

        beforeEach(() => {
            googleSheetsHelper.createAndConnectJwtClient = mockCreateAndConnectJwtClient;
            emailHelper.sendEmail = mockSendEmail;
            googleSheetsHelper.retrieveAndPrintSheet = mockRetrieveAndPrintSheet;
        });

        describe('Connection to Google and retrieves sheet', () => {
            it('should return sheet content', async () => {
                const spreadsheetValues = [
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
                
                mockCreateAndConnectJwtClient.mockResolvedValue({});
                mockRetrieveAndPrintSheet.mockResolvedValue(spreadsheetValues);

                const response = await sheetsHelper.returnSpreadsheet();

                expect(mockCreateAndConnectJwtClient).toHaveBeenCalled();
                expect(mockRetrieveAndPrintSheet).toHaveBeenCalledWith({}, expect.any(String));
                expect(response).toStrictEqual(spreadsheetValues);
            });
        });

        describe('Connection to Google but fails to retrieve sheet', () => {
            it('should throw an error', () => {
                const mockSheetError = new Error('Expected sheet error');

                mockCreateAndConnectJwtClient.mockResolvedValue({});
                mockRetrieveAndPrintSheet.mockRejectedValue(mockSheetError);

                return sheetsHelper.returnSpreadsheet().catch(err => {
                    expect(err).toStrictEqual(mockSheetError);
                    expect(mockSendEmail).toHaveBeenCalled();
                });
            });
        });

        describe('Connection to Google fails', () => {
            it('should throw an error', async () => {
                const mockGoogleError = new Error('Expected google error');

                mockCreateAndConnectJwtClient.mockRejectedValue(mockGoogleError);

                return sheetsHelper.returnSpreadsheet().catch(err => {
                    expect(err).toStrictEqual(mockGoogleError);
                    expect(mockSendEmail).toHaveBeenCalled();
                });
            });
        });

        describe('Connection to Google fails and email fails', () => {
            it('should throw an error', async () => {
                const mockGoogleError = new Error('Expected google error');
                const mockEmailError = new Error('Expected email error');

                mockCreateAndConnectJwtClient.mockRejectedValue(mockGoogleError);
                mockSendEmail.mockRejectedValue(mockEmailError);

                return sheetsHelper.returnSpreadsheet().catch(err => {
                    expect(err).toStrictEqual(mockGoogleError);
                    expect(mockSendEmail).toHaveBeenCalled();
                });
            });
        });
    });
});