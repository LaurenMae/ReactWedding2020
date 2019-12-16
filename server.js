const express = require('express');
const app = express();
const cors = require('cors');
const emailHelper = require('./helpers/emailHelper');
const sheetHelper = require('./helpers/sheetsHelper');

const clientAppDirectory = 'client/build';

app.use(cors());
app.use(require("body-parser").json());
app.use(express.static(clientAppDirectory));

app.post('/api/rsvp/', async (req, res) => {
    const spreadsheetValues = [[
        req.body.values.attendance,
        req.body.values.firstName,
        req.body.values.lastName,
        req.body.values.email,
        req.body.values.phone,
        req.body.values.diet,
        req.body.values.song
    ]];
    
    try {
        await sheetHelper.update(spreadsheetValues, req.body);
        const emailInfo = await emailHelper.sendEmail(`RSVP, ${req.body.firstName}`, JSON.stringify(req.body));
        console.info(`Message sent: ${emailInfo.messageId}`);
        res.send(200);
    }
    catch (emailError) {
        console.error(
            `Error when sending RSVP update email! RSVP was ${JSON.stringify(req.body, null, 2)}, error was: `, 
            emailError
        );
        res.send(500);
    }
});

app.post('/api/getRsvpList', async (req, res) => {
    
    try {
        const resp = await sheetHelper.returnSheet(req.body.sheetName, req.body.sheetRange);
        res.send(resp.map((row) => {
            return {
                firstName: row[1] ? row[1].toLowerCase() : '',
                lastName: row[2] ? row[2].toLowerCase() : ''
            };
        }));
    } catch (err) {
        console.error('Problem getting RSVP list', err);
        res.send(500);
    }
});

app.post('/api/hotelBooking/:firstName/:lastName', async (req, res) => {
    try {
        const resp = await sheetHelper.returnSheet(req.body.sheetName, req.body.sheetRange);
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
        console.error('Error getting hotel info', err);
        res.send(500);
    }
});

app.get('/api/getGuestList', async (req, res) => {
    try {
        const resp = await sheetHelper.returnSpreadsheet();
        res.send(resp);
    } catch (err) {
        console.error('Error getting guest list', err);
        res.send(500);
    }
});

app.get('*', function (req, res) {
    res.status(200).sendFile(`/`, { root: clientAppDirectory });
});

module.exports = app;