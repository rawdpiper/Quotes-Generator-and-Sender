const axios = require("axios");
const dotenv = require("dotenv");
const email = require("./email");

dotenv.config();

let count = 0;

async function fetchQuote() {
  try {
    const response = await axios({
      method: "get",
      url: `https://api.paperquotes.com/apiv1/quotes/?limit=1&offset=${count}&tags=romantic,love&order=-likes`,
      headers: {
        Authorization: process.env.PAPER_QUOTES_TOKEN,
        "Content-Type": "application/json",
      },
    });
    await email.sendCount(count);
    count = count + 1;
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchQuote;

// (async () => {
//   await fetchQuotes();
// })();
