const nodemailer = require('nodemailer');
import 'dotenv/config';
import { getAllUsers } from '../db/db.mjs';

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const sendEventOut = async (excludedUser, eventId) => {

    const userList = await getAllUsers(excludedUser)
    userList.forEach((u) => {
        const message = `
        New Event: http://event.obadiahfusco.com/event/${eventId}/${u._id.toString()}\n
        Stop Receiving Messages: http://event.obadiahfusco.com/stop
        `
        sendSMS(u.gate_way, message)
    })
}

// Send SMS via email
const sendSMS = async (gateway, message) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: gateway,
        text: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('SMS sent:', info.response);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};