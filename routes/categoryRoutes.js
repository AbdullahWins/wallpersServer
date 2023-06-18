const express = require("express");
const router = express.Router();

const {
  getAllRingtoneCategories,
  getAllwallpaperCategories,
  addOneRingtoneCategory,
  addOneWallpaperCategory,
  updateRingtoneCategoryById,
  updateWallpaperCategoryById,
} = require("../controllers/categoryController");

router.get("/categories/ringtone", getAllRingtoneCategories);
router.get("/categories/wallpaper", getAllwallpaperCategories);
router.post("/categories/add/ringtone", addOneRingtoneCategory);
router.post("/categories/add/wallpaper", addOneWallpaperCategory);
router.patch("/categories/edit/wallpaper/:id", updateWallpaperCategoryById);
router.patch("/categories/edit/ringtone/:id", updateRingtoneCategoryById);

module.exports = router;
