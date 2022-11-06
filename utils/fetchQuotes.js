const axios = require("axios");
const dotenv = require("dotenv");
const email = require("./email");
const Redis = require("ioredis");

dotenv.config();
const redis = new Redis(process.env.REDIS_URL);

redis.get("count", async (err, result) => {
  if (err) {
    await redis.set("count", 1);
    console.log("Count key set to 1");
  } else {
    console.log(`Count key exists: ${result}`);
  }
});

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
    count++;
    await redis.set("count", count);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchQuote;
