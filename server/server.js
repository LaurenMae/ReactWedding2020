const express = require('express');
const app = express();
const cors = require('cors');
const googleSheetsHelper = require('./helpers/googleSheetsHelper');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

app.use(cors());
app.use(require("body-parser").json());

app.listen(3001, function() {
    console.log('listening on 3001');
});

app.post('/test/', async (req, res) => {

    try {
        const spreadsheetValues = [Object.values(req.body)];
        await updateSpreadsheet(spreadsheetValues);
        sendEmail(`RSVP, ${req.body.name}`, JSON.stringify(req.body));
        res.sendStatus(200);
    } catch (err) {
        throw err;
    }
});

const updateSpreadsheet = async(spreadsheetValues) => {
    try {
        const jwtClient = await googleSheetsHelper.createAndConnectJwtClient();
        const weddingSpreadsheetId = '1hA-6gL8cQfmUtkGAKGuZYJBNkupgb0aB_3tDciPM15I';
        await googleSheetsHelper.updateAndPrintSheet(jwtClient, weddingSpreadsheetId, spreadsheetValues);
    } catch (err) {
        console.error(`Error updating spreadsheet: ${err}`);
        sendEmail('Wedding App Error', `Updating spreadsheet error: ${JSON.stringify(err)}`);
        throw error;
    }
};

const sendEmail = async (subject, text) => {
    try {
        let info = await transporter.sendMail({
            from: '"Wedding App" <lauren.mae.welsh@gmail.com>',
            to: "lauren.mae.welsh@gmail.com",
            subject,
            text
        });
    
        console.info(`Message sent: ${info.messageId}`);
    } catch (e) {
        console.error(`Error sending email: ${err}`);
        throw error;
    }
};