const fetchQuotes = require("./fetchQuotes");
const email = require("./email");
const renderEmail = require("./render");

async function sendMail() {
  try {
    const quote = await fetchQuotes();
    const html = await renderEmail(
      quote.results[0].quote,
      quote.results[0].author
    );
    await email.sendEmail(html);
    console.log("mail sent");
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;

(async () => {
  await sendMail();
})()
