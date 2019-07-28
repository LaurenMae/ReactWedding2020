const { google } = require('googleapis');
const sheets = google.sheets('v4');
const nconf = require('nconf');

const createAndConnectJwtClient = async () => {
  const jwtClient = new google.auth.JWT(
    nconf.get('client_email'),
    null,
    nconf.get('private_key'),
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
      range: 'A1:D4'
    });

    for (let row of response.data.values) {
      console.log('Title [%s]\t\tRating [%s]', row[0], row[1]);
    }
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
