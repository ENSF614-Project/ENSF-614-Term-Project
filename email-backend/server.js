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
            user: 'mohd.abusaleh@gmail.com',
            pass: 'etyq wnea ojrg anrt',
        },
    });

    const mailOptions = {
        from: 'mohd.abusaleh@gmail.com',
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
