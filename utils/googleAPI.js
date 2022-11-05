const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function getAccessToken() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    return accessToken;
  } catch (error) {
    console.log(error);
  }
}

const accessToken = async () => {
  const token = await getAccessToken();

  return token;
};

module.exports = accessToken;
