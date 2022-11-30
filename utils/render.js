const ejs = require("ejs");
const path = require("path");

async function renderEmail(quote, author, currentImage) {
  try {
    const filePath = path.join(__dirname, "../views/mail/email.ejs");
    const html = await ejs.renderFile(filePath, { quote, author, currentImage });
    return html;
  } catch (error) {
    console.log(error);
  }
}

module.exports = renderEmail;
