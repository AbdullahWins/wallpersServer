const express = require("express");
const router = express.Router();

const {
  getOneRingtone,
  getAllRingtones,
  getRingtonesByCategory,
  getRingtonesByCreatorChoice,
  getRingtonesByType,
  addOneRingtone,
} = require("../controllers/ringtoneController");

router.get("/ringtones/find/:id", getOneRingtone);
router.get("/ringtones", getAllRingtones);
router.get("/ringtones/categories/:categoryName", getRingtonesByCategory);
router.get("/ringtones/types/:typeName", getRingtonesByType);
router.get("/ringtones/creatorChoice", getRingtonesByCreatorChoice);
router.post("/ringtones/add", addOneRingtone);

module.exports = router;
