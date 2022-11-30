const fetchQuotes = require("./fetchQuotes");
const email = require("./email");
const renderEmail = require("./render");
const images = require("../JSON/images.js");
const randomNumberGenerator = require("./randomNumberGenerator");

async function sendMail() {
  try {
    const currentImage = images[randomNumberGenerator(images.length)];
    const { data, nextOffset } = await fetchQuotes();
    const html = await renderEmail(
      data.results[0].quote,
      data.results[0].author,
      currentImage
    );
    await email.sendEmail(html);
    console.log("Mail Sent to Koche");
    await email.sendCountandQuote(nextOffset, data.results[0].quote);
    console.log("Verification Mail Sent");
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;
