const nodemailer = require('nodemailer');
const { fromEnv } = require('../utils')
const logger = require('../utils/logger');
const oauth2Client = require('../config/oauth2')

async function sendReferrerEmail(  refereeName ,referrerName, courseName,refereeEmail ) {
    const accessToken = await oauth2Client.getAccessToken();

	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: 'OAuth2',
			user: fromEnv('EMAIL'),
			pass: fromEnv('PASSWORD'),
			clientId: fromEnv('CLIENT_ID'),
            clientSecret: fromEnv('CLIENT_SECRET'),
        	refreshToken: fromEnv('REFRESH_TOKEN'),
        	accessToken: accessToken.token,
		},
	});

	let message = {
		from: fromEnv('Email'),
		to: refereeEmail,
		subject: 'Referral Confirmation',
	    text: `Hello ${refereeName},${referrerName} has referred you to the course: ${courseName}.\n\nCheck it out!\n\nBest regards,\nRefer & Earn Team`,
        html: `<h1>Hello ${refereeName},${referrerName} has referred you to the course: ${courseName}.\n\nCheck it out!\n\nBest regards,\nRefer & Earn Team.</h1>`,
	};

	try {
		await transporter.sendMail(message);
		logger.info("Email sent successfully.");
	} catch (error) {
		logger.error("Email sending error:", error);
	}
}

module.exports = sendReferrerEmail