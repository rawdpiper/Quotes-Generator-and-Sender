const decrementOffsetKey = require('../controllers/decrementOffsetKey.controller');
const express = require("express");
const router = express.Router();

router.get("/decrement-offset-key", decrementOffsetKey);

module.exports = router;