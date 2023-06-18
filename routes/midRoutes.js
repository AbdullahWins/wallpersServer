const router = require("express").Router();

const {
  createImageFromPrompt,
  replicateImage,
} = require("../controllers/midController");

router.get("/mid", createImageFromPrompt);
router.post("/rep", replicateImage);

module.exports = router;
