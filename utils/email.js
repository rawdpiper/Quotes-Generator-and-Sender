const transport = require("./transport.js");

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

const sendQuote = async (quote) => {
  try {
    const result = await transport.sendMail({
      from: process.env.EMAIL_SENDER,
      to: process.env.COUNT_RECEIVER,
      subject: "Quote Sent",
      text: `Quote: ${quote}`,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail,
  sendQuote,
};
