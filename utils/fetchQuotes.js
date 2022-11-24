const dotenv = require("dotenv");
const Redis = require("ioredis");
const helperFunctions = require("../helpers/helperFunctions");

dotenv.config();
const redis = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

redis.get("offset", async (err, result) => {
  if (result == null) {
    await redis.set("offset", 0);
    console.log("Offset key initialized and set to 0");
  } else {
    console.log(result);
    console.log(`Offset key exists: ${result}`);
  }
});

async function fetchQuote() {
  try {
    const offset = await redis.get("offset");
    const response = await helperFunctions.APIconnect(offset);
    const data = response.data;
    await redis.incr("offset");
    const nextOffset = await redis.get("offset");
    return { data, nextOffset };
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchQuote;
