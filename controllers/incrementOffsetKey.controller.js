const Redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

async function incrementOffsetKey(req, res) {
  try {
    await redis.incr("offset");
    const key = await redis.get("offset");
    res.status(200).json({
      status: "success",
      message: "Offset key incremented successfully",
      data: key
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = incrementOffsetKey;
