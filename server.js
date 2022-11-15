const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");

const viewNextQuoteRoute = require('./routes/viewNextQuote.routes');
const incrementOffsetKeyRoute = require('./routes/incrementOffsetKey.routes');

dotenv.config();

app.use(express.static(path.join(__dirname, "public")))

require("./cronjobs/sendMail.cronjob");

app.use('/api', viewNextQuoteRoute);
app.use('/api', incrementOffsetKeyRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Listening on port : ${PORT}`);
});
