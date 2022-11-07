const axios = require("axios");
const dotenv = require("dotenv");
const Redis = require("ioredis");

dotenv.config();
const redis = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

redis.get("count", async (err, result) => {
  if (result == null) {
    await redis.set("count", 0);
    console.log("Count key initialized and set to 0");
  } else {
    console.log(`Count key exists: ${result}`);
  }
});

async function fetchQuote() {
  try {
    const count = await redis.get("count");
    const response = await axios({
      method: "get",
      url: `https://api.paperquotes.com/apiv1/quotes/?limit=1&offset=${count}&tags=romantic,love&order=-likes`,
      headers: {
        Authorization: process.env.PAPER_QUOTES_TOKEN,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    await redis.incr("count");
    return { data, count };
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchQuote;
