const fetchQuotes = require("./fetchQuotes");
const email = require("./email");
const renderEmail = require("./render");

async function sendMail() {
  try {
    const { data, offset } = await fetchQuotes();
    const html = await renderEmail(
      data.results[0].quote,
      data.results[0].author
    );
    await email.sendEmail(html);
    console.log("Mail Sent to Koche");
    await email.sendCountandQuote(offset, data.results[0].quote);
    console.log("Verification Mail Sent");
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;
