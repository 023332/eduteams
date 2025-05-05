import nodemailer  from 'nodemailer';
import { User, Event } from '../models/index.js';
import emailService from '../services/emailService.js';


const sendRegistrationEmail = async (userEmail, event) => {
    const subject = `Registration Confirmation for ${event.title}`;
    const text = `You have successfully registered for the event: ${event.title}. Details: ${event.description}, Date: ${event.date}, Location: ${event.location}.`;
    
    await EmailService.sendEmail(userEmail, subject, text);
};


const notifyEventUpdate = async (eventId) => {
    const event = await Event.findByPk(eventId);
    if (!event) return;

    const subject = `Event Update: ${event.title}`;
    const text = `The event "${event.title}" has been updated. New details: ${event.description}, Date: ${event.date}, Location: ${event.location}.`;


    const registeredUsersEmails = [];

    for (const email of registeredUsersEmails) {
        await EmailService.sendEmail(email, subject, text);
    }
};

module.exports = {
    sendRegistrationEmail,
    notifyEventUpdate,
};