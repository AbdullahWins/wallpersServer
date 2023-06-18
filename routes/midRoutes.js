const express = require("express");
const router = express.Router();

const {
  createImageFromPrompt,
  replicateImage,
} = require("../controllers/midController");

router.get("/mid", createImageFromPrompt);
router.post("/rep", replicateImage);

module.exports = router;
