const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    const { templateParams } = req.body;

    // Configure the transporter (use your email credentials)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any email service you use
        auth: {
            user: 'ENSF614GROUP19@GMAIL.COM', // email
            pass: 'gxbz nylr cmcm iiqg', // email password, or app pass
        },
        tls: {
            rejectUnauthorized: false, // Accept self-signed certificates
        },
    });

    const mailOptions = {
        from: 'ENSF614GROUP19@GMAIL.COM',
        to: templateParams.user_email,
        subject: 'Your Receipt and Ticket',
        text: `Dear Valued Customer,\n\n${templateParams.receipt}\n\n${templateParams.ticket_details}\n\n${templateParams.movie_info}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send('Failed to send email');
    }
});

app.post('/send-email-register', async (req, res) => {
    const { templateParams } = req.body;

    // Configure the transporter (use your email credentials)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any email service you use
        auth: {
            user: 'ENSF614GROUP19@GMAIL.COM',
            pass: 'gxbz nylr cmcm iiqg',
        },
        tls: {
            rejectUnauthorized: false, // Accept self-signed certificates
        },
    });

    const mailOptions = {
        from: 'ENSF614GROUP19@GMAIL.COM',
        to: templateParams.user_email,
        subject: 'Newly Registered User',
        text: `Dear Valued Customer,\n\n${templateParams.receipt}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send('Failed to send email');
    }
});

// Email sending endpoint Cancel ticket
app.post('/send-email-cancel', async (req, res) => {
    const { templateParams } = req.body;

    // Configure the transporter (use your email credentials)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any email service you use
        auth: {
            user: 'ENSF614GROUP19@GMAIL.COM',
            pass: 'gxbz nylr cmcm iiqg',
        },
        tls: {
            rejectUnauthorized: false, // Accept self-signed certificates
        },
    });

    const mailOptions = {
        from: 'ENSF614GROUP19@GMAIL.COM',
        to: templateParams.user_email,
        subject: 'Your Cancelled Ticket Info',
        text: `Dear Valued Customer,\n\nYou've cancelled the following tickets:\n${templateParams.ticketStuff}
        \nA refund has been issued in the form of a coupon to your account.
        \nPlease visit the coupon page to view the refund.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send('Failed to send email');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
