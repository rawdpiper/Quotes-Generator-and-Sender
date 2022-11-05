const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const accessToken = require("./googleAPI");
dotenv.config();

const transport = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  pool: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(transport);

module.exports = transporter;