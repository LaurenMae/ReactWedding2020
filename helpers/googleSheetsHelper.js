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

const retrieveSheet = async (jwtClient, sheetId, name, range) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: sheetId,
      range: `${name}!${range}`
    });

    return response.data.values;
    // .map((row) => {
    //   return {
    //     firstName: row[0] ? row[0].toLowerCase() : '',
    //     lastName: row[1] ? row[1].toLowerCase() : ''
    //   };
    // });
  }
  catch (error) {
    console.error('Failed retrieving sheet data', error);
    process.exit(1);
  }
};

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
  console.log('google values', values)
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
  updateAndPrintSheet,
  retrieveSheet
}
