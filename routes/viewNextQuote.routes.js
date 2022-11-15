const viewNextQuoteController = require("../controllers/viewNextQuote.controller");
const express = require("express");
const router = express.Router();

router.get("/view-next-quote", viewNextQuoteController);

module.exports = router;