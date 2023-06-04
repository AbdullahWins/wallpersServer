const express = require("express");
const router = express.Router();

const {
  getAllRingtoneCategories,
  getAllwallpaperCategories,
  addOneRingtoneCategory,
  addOneWallpaperCategory,
} = require("../controllers/categoryController");

router.get("/categories/ringtone", getAllRingtoneCategories);
router.get("/categories/wallpaper", getAllwallpaperCategories);
router.post("/categories/add/ringtone", addOneRingtoneCategory);
router.post("/categories/add/wallpaper", addOneWallpaperCategory);

module.exports = router;