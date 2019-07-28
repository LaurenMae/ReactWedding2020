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

  await jwtClient.authorize();
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

module.exports = {
  createAndConnectJwtClient,
  retrieveAndPrintSheet,
  updateAndPrintSheet
}
