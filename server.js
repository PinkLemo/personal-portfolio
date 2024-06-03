const express = require('express');
const bodyParser = require('body-parser');
const { saveMessage } = require('./database');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tashmiti1@gmail.com',  // Your Gmail email address
        pass: 'hibm kiux alrz ewvj'  // Your Gmail password or app-specific password
    }
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message, targetEmail } = req.body;

    // Send email using nodemailer
    const mailOptions = {
        from: email,  // sender's email address
        to: 'tashmiti1@gmail.com',  // your email address
        subject: 'New Message from your Portfolio Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send message.');
        } else {
            console.log('Email sent: ' + info.response);
            // Save the message to the database
            saveMessage(name, email, message, (err) => {
                if (err) {
                    res.status(500).send('Failed to save message.');
                } else {
                    res.status(200).send('Message saved and email sent successfully.');
                }
            });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
