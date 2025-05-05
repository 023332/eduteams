import nodemailer  from 'nodemailer';


export function sendEmailConfirmation(userEmail, token) {

    console.log(`Sending email to ${userEmail} with token ${token}`);
}
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

const sendEventConfirmation = (userEmail, eventTitle) => {
    const subject = `Confirmation for ${eventTitle}`;
    const text = `You have successfully registered for the event: ${eventTitle}.`;
    return sendEmail(userEmail, subject, text);
};

const sendEventUpdateNotification = (userEmail, eventTitle) => {
    const subject = `Update on ${eventTitle}`;
    const text = `The event ${eventTitle} has been updated. Please check for the latest details.`;
    return sendEmail(userEmail, subject, text);
};

module.exports = {
    sendEventConfirmation,
    sendEventUpdateNotification,
};