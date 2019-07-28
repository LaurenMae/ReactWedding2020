const { google } = require('googleapis');
const privatekey = require("./WeddingApp-9068afdac0b5.json");
const sheets = google.sheets('v4');

const createAndConnectJwtClient = async () => {
  const jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  try {
    await jwtClient.authorize();
  }
  catch (error) {
    console.error('Failed authenticating with Google', error);
    process.exit(1);
  }

  return jwtClient;
}

const retrieveAndPrintSheet = async (jwtClient, sheetId) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: sheetId,
      range: 'Guests!A2:B122'
    });

    return response.data.values.map((row) => {
      return {
        firstName: row[0] ? row[0].toLowerCase() : '',
        lastName: row[1] ? row[1].toLowerCase() : ''
      };
    });
  }
  catch (error) {
    console.error('Failed retrieving sheet data', error);
    process.exit(1);
  }
}

const updateAndPrintSheet = async (jwtClient, spreadsheetId, values) => {
  try {
    await sheets.spreadsheets.values.append({
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      range: 'test!A2:D2',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values
      }
    });
  }
  catch (error) {
    console.error('Failed retrieving sheet data', error);
    throw error;
  }
}

module.exports = {
  createAndConnectJwtClient,
  retrieveAndPrintSheet,
  updateAndPrintSheet
}
