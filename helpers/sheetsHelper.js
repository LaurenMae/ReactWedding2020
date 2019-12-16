const googleSheetsHelper = require('./googleSheetsHelper');
const emailHelper = require('./emailHelper');

const updateSpreadsheet = async(spreadsheetValues) => {
    const jwtClient = await googleSheetsHelper.createAndConnectJwtClient();
    const weddingSpreadsheetId = '1hA-6gL8cQfmUtkGAKGuZYJBNkupgb0aB_3tDciPM15I';
    await googleSheetsHelper.updateAndPrintSheet(jwtClient, weddingSpreadsheetId, spreadsheetValues);
};

const returnSpreadsheet = async() => {
    try {
        const jwtClient = await googleSheetsHelper.createAndConnectJwtClient();
        const weddingSpreadsheetId = '1hA-6gL8cQfmUtkGAKGuZYJBNkupgb0aB_3tDciPM15I';
        return await googleSheetsHelper.retrieveAndPrintSheet(jwtClient, weddingSpreadsheetId);
    } catch (err) {
        console.error(`Error reading spreadsheet: ${err}`);
        try {
            await emailHelper.sendEmail('Wedding App Error', `Reading spreadsheet error: ${JSON.stringify(err)}`);
        } catch (error) {
            console.error(`Error sending email: ${error}`);
        } finally {
            throw err;
        }
    }
};

const returnSheet = async(name, range) => {
    try {
        const jwtClient = await googleSheetsHelper.createAndConnectJwtClient();
        const weddingSpreadsheetId = '1hA-6gL8cQfmUtkGAKGuZYJBNkupgb0aB_3tDciPM15I';
        return await googleSheetsHelper.retrieveSheet(jwtClient, weddingSpreadsheetId, name, range);
    } catch (err) {
        console.error(`Error reading spreadsheet: ${err}`);

        try {
            await emailHelper.sendEmail('Wedding App Error', `Reading spreadsheet error: ${JSON.stringify(err)}`);
        } catch (error) {
            console.error('Error sending email: Error - ', error);
        } finally {
            throw err;
        }
    }
};

const update = async (spreadsheetValues, values) => {
    try {
        await module.exports.updateSpreadsheet(spreadsheetValues);
        await emailHelper.sendConfirmationEmail(values);
    } catch (error) {
        console.error('Error when updating spreadsheet: ', error);
        
        try {
            await emailHelper.sendEmail('Wedding App Error', `Updating spreadsheet error: ${JSON.stringify(error)}`);
        } catch (err) {
            console.error('Error sending email: RSVP - ', spreadsheetValues, '. Error - ', err);
        } finally {
            throw error;
        }
    }
};

module.exports = {
    update,
    returnSheet,
    updateSpreadsheet,
    returnSpreadsheet
};