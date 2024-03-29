import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();
const emailConfig = {
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(emailConfig);

export async function sendEmail(subject, html, to) {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
}