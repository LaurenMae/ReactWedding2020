const { google } = require('googleapis');
const privatekey = require("./WeddingApp-9068afdac0b5.json");
const sheets = google.sheets('v4');

const weddingSpreadsheetId = '1hA-6gL8cQfmUtkGAKGuZYJBNkupgb0aB_3tDciPM15I';

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

(async () => {
  const jwtClient = await createAndConnectJwtClient();
  await retrieveAndPrintSheet(jwtClient, weddingSpreadsheetId);
})();

