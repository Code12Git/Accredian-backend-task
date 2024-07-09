require('dotenv').config();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { fromEnv } = require('../utils')
const oauth2Client = new OAuth2(
  fromEnv('CLIENT_ID'),
  fromEnv('CLIENT_SECRET'),
  fromEnv('REDIRECT_URL')
);

oauth2Client.setCredentials({
  refresh_token: fromEnv('REFRESH_TOKEN'),
});

module.exports = oauth2Client;
