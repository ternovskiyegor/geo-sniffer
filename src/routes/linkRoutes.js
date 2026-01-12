const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");

router.post("/", linkController.createLink);

module.exports = router;