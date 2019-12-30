const { google } = require('googleapis');
const nconf = require('nconf');

const createAndConnectJwtClient = async () => {
  const jwtClient = new google.auth.JWT(
    nconf.get('client_email'),
    null,
    nconf.get('private_key'),
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  await jwtClient.authorize();
  return jwtClient;
};

const retrieveSheet = async (jwtClient, sheetId, name, range) => {
  try {
    const response = await google.sheets('v4').spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: sheetId,
      range: `${name}!${range}`
    });

    return response.data.values || [];
  }
  catch (error) {
    console.error('Failed retrieving sheet data', error);
    throw error;
  }
};

const retrieveAndPrintSheet = async (jwtClient, sheetId) => {
  try {
    const response = await google.sheets('v4').spreadsheets.values.get({
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
    throw error;
  }
}

const updateAndPrintSheet = async (jwtClient, spreadsheetId, values) => {
  try {
    await google.sheets('v4').spreadsheets.values.append({
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      range: 'rsvp!A2:D2',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values
      }
    });
  } catch (error) {
    console.error('Error updating the sheet', error);
    throw error;
  }
}

module.exports = {
  createAndConnectJwtClient,
  retrieveAndPrintSheet,
  updateAndPrintSheet,
  retrieveSheet
}
