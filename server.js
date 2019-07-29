const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: 'config-overrides.json' });

const googleSheetsHelper = require('./helpers/googleSheetsHelper');
const port = process.env.PORT || 3001;
const clientAppDirectory = 'client/build';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: nconf.get('emailUsername'),
        pass: nconf.get('emailPassword')
    }
});

app.use(cors());
app.use(require("body-parser").json());
app.use(express.static(clientAppDirectory));

app.listen(port, function() {
    console.log(`listening on ${port}`);
});

app.post('/api/test/', async (req, res) => {
    try {
        const spreadsheetValues = [Object.values(req.body)];
        await updateSpreadsheet(spreadsheetValues);
        res.sendStatus(200);
    } catch (spreadsheetError) {
        console.error('Error when updating spreadsheet: ', spreadsheetError);
        res.sendStatus(500);

        return sendEmail('Wedding App Error', `Updating spreadsheet error: ${JSON.stringify(error)}`)
            .catch((emailError) => {
                console.error('Failed sending error email too: ', emailError);
            }); 
    }
    
    try {
        const emailInfo = await sendEmail(`RSVP, ${req.body.name}`, JSON.stringify(req.body));
        console.info(`Message sent: ${emailInfo.messageId}`);
    }
    catch (emailError) {
        console.error(
            `Error when sending RSVP update email! RSVP was ${JSON.stringify(req.body, null, 2)}, error was: `, 
            emailError
        );
    }
});

app.get('/getGuestList', async (req, res) => {
    try {
        const resp = await returnSpreadsheet();
        res.send(resp);
    } catch (err) {
        throw err;
    }
});

app.get('*', function (req, res) {
    res.status(200).sendFile(`/`, { root: clientAppDirectory });
});

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
        sendEmail('Wedding App Error', `Reading spreadsheet error: ${JSON.stringify(err)}`);
        throw error;
    }
};

const sendEmail = async (subject, text) => {
    return await transporter.sendMail({
        from: '"Wedding App" <lauren.mae.welsh@gmail.com>',
        to: "lauren.mae.welsh@gmail.com",
        subject,
        text
    });
};