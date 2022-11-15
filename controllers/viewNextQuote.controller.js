const Redis = require("ioredis");
const helperFunctions = require("../helpers/helperFunctions");
const dotenv = require("dotenv");

dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

async function viewNextQuote(req, res) {
  try {
    const offset = await redis.get("offset");
    const response = await helperFunctions.APIconnect(offset);
    res.status(200).json({
      status: "success",
      message: "Next Quote fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = viewNextQuote;
