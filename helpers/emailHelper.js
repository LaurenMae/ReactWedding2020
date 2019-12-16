const nodemailer = require('nodemailer');
const Email = require('email-templates');
const nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: 'config-overrides.json' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: nconf.get('emailUsername'),
        pass: nconf.get('emailPassword')
    }
});

const email = new Email({
    message: {
        from: '"Wedding App" <lauren.mae.welsh@gmail.com>', 
    },
    preview: false,
    send: true,
    transport: transporter
});
  
const sendEmail = async (subject, text) => {
    return await transporter.sendMail({
        from: '"Wedding App" <lauren.mae.welsh@gmail.com>',
        to: "lauren.mae.welsh@gmail.com",
        subject,
        text
    });
};

const sendConfirmationEmail = async (inviteResponse) => {
    const locals = {
        name: inviteResponse.values.firstName,
        attendance: inviteResponse.values.attendance
    };

    if (inviteResponse.hotels) {
        locals.hotel = inviteResponse.hotels;
    }

    email.send({
        template: 'rsvpConfirmation',
        message: {
            to: inviteResponse.values.email
        },
        locals
    }).catch(console.error);
};

module.exports = {
    sendConfirmationEmail,
    sendEmail
};