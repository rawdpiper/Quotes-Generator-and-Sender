const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");

dotenv.config();

app.use(express.static(path.join(__dirname, "public")))

require("./cronjobs/sendMail.cronjob");

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Listening on port : ${PORT}`);
});
