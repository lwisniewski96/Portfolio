const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
        pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: 'lwisniewski401@gmail.com',
        subject: `Message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
