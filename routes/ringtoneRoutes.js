const express = require("express");
const router = express.Router();

const {
  getOneRingtone,
  getAllRingtones,
  getRingtonesByCategory,
  getRingtonesByCreatorChoice,
  getRingtonesByTrending,
  getRingtonesByType,
  addOneRingtone,
  updateRingtoneById,
} = require("../controllers/ringtoneController");

router.get("/ringtones/find/:id", getOneRingtone);
router.get("/ringtones", getAllRingtones);
router.get("/ringtones/categories/:categoryName", getRingtonesByCategory);
router.get("/ringtones/types/:typeName", getRingtonesByType);
router.get("/ringtones/creatorChoice", getRingtonesByCreatorChoice);
router.get("/ringtones/trending", getRingtonesByTrending);
router.post("/ringtones/add", addOneRingtone);
router.patch("/ringtones/edit/:id", updateRingtoneById);

module.exports = router;
