const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const nconf = require('nconf');
const Email = require('email-templates');

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

app.post('/api/rsvp/', async (req, res) => {
    try {
        const spreadsheetValues = [Object.values(req.body.values)];
        await updateSpreadsheet(spreadsheetValues);
        await sendConfirmationEmail(req.body);
        res.sendStatus(200);
    } catch (spreadsheetError) {
        console.error('Error when updating spreadsheet: ', spreadsheetError);
        await sendEmail('Wedding App Error', `Updating spreadsheet error: ${JSON.stringify(error)}`)

        res.sendStatus(500);
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

const returnSheet = async(name, range) => {
    try {
        const jwtClient = await googleSheetsHelper.createAndConnectJwtClient();
        const weddingSpreadsheetId = '1hA-6gL8cQfmUtkGAKGuZYJBNkupgb0aB_3tDciPM15I';
        return await googleSheetsHelper.retrieveSheet(jwtClient, weddingSpreadsheetId, name, range);
    } catch (err) {
        console.error(`Error reading spreadsheet: ${err}`);
        sendEmail('Wedding App Error', `Reading spreadsheet error: ${JSON.stringify(err)}`);
        throw error;
    }
};

app.post('/api/getRsvpList', async (req, res) => {
    try {
        const resp = await returnSheet(req.body.sheetName, req.body.sheetRange);
        res.send(resp.map((row) => {
            return {
                firstName: row[0] ? row[0].toLowerCase() : '',
                lastName: row[1] ? row[1].toLowerCase() : ''
            };
        }));
    } catch (err) {
        throw err;
    }
});

app.post('/api/hotelBooking/:firstName/:lastName', async (req, res) => {
    try {
        const resp = await returnSheet(req.body.sheetName, req.body.sheetRange);
        const bookings = resp.map(booking => {
            return {
                dates: booking[0],
                roomType: booking[1],
                name: booking[2],
                cost: booking[3],
                paid: booking[4],
                outstanding: booking[5],
                due: booking[6]
            }
        });

        const hotelBooking = bookings.find(guest => {
            return guest.name.trim().toLowerCase() === `${req.params.firstName.trim().toLowerCase()} ${req.params.lastName.trim().toLowerCase()}`;
        });

        if (hotelBooking) {
            res.send(hotelBooking);
        } else {
            res.send(null);
        }
    } catch (err) {
        throw err;
    }
});

app.get('/api/getGuestList', async (req, res) => {
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


const email = new Email({
  message: {
      from: '"Wedding App" <lauren.mae.welsh@gmail.com>', 
  },
  preview: false,
  send: true,
  transport: transporter
});

const updateSpreadsheet = async(spreadsheetValues) => {
    const jwtClient = await googleSheetsHelper.createAndConnectJwtClient();
    const weddingSpreadsheetId = '1hA-6gL8cQfmUtkGAKGuZYJBNkupgb0aB_3tDciPM15I';
    await googleSheetsHelper.updateAndPrintSheet(jwtClient, weddingSpreadsheetId, spreadsheetValues);
};

const sendConfirmationEmail = async (inviteResponse) => {
    console.log(inviteResponse);
    email.send({
        template: 'rsvpConfirmation',
        message: {
            to: inviteResponse.values.email
        },
        locals: {
            name: inviteResponse.values.firstName,
            attendance: inviteResponse.values.attendance,
            hotel: inviteResponse.hotels
        }
    }).catch(console.error);
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