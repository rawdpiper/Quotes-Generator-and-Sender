const Redis = require("ioredis");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function redisLocal() {
  try {
    const redis = new Redis(process.env.REDIS_URL_LOCAL);
    return redis;
  } catch (error) {
    console.log(error);
  }
}

async function redis() {
  try {
    const redis = new Redis(process.env.REDIS_URL, {
      tls: {
        rejectUnauthorized: false,
      },
    });
    return redis;
  } catch (error) {
    console.log(error);
  }
}

async function APIconnect(offset) {
  try {
    const response = await axios({
      method: "get",
      url: `https://api.paperquotes.com/apiv1/quotes/?limit=1&offset=${offset}&tags=love,romance&order=-likes`,
      headers: {
        Authorization: process.env.PAPER_QUOTES_TOKEN,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { redisLocal, redis, APIconnect };
