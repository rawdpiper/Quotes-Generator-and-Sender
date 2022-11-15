const incrementOffsetKeyController = require("../controllers/incrementOffsetKey.controller");
const express = require("express");
const router = express.Router();

router.get("/increment-offset-key", incrementOffsetKeyController);

module.exports = router;
