const transport = require("./transport.js");
const { htmlToText } = require("html-to-text");

const sendEmail = async (html) => {
  try {
    const result = await transport.sendMail({
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECEIVER,
      subject: "Daily Random Love/Romantic Quotes",
      html,
    });
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const sendCount = async (count) => {
  try {
    const result = await transport.sendMail({
      from: process.env.EMAIL_SENDER,
      to: process.env.COUNT_RECEIVER,
      subject: "Daily Count",
      text: `Total number of quotes sent: ${count}`,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail,
  sendCount,
};
