const nodemailer = require('nodemailer');
require('dotenv').config();
const sendEmail = async (to, subject, html) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., Gmail, Yahoo, etc.
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
    });

    // Define email options
    const mailOptions = {
        from: `"Algoskool Official" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    
    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('An error occurred while sending the email.');
    }
};

module.exports = sendEmail;