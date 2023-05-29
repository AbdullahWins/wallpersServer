const express = require("express");
const router = express.Router();

const {
  getOneWallpaper,
  getAllWallpapers,
  getWallpapersByCategory,
  getWallpapersByType,
  addOneWallpaper,
} = require("../controllers/wallpaperController");

router.get("/wallpapers/find/:id", getOneWallpaper);
router.get("/wallpapers/all", getAllWallpapers);
router.get("/wallpapers/categories/:categoryName", getWallpapersByCategory);
router.get("/wallpapers/types/:typeName", getWallpapersByType);
router.post("/wallpapers/add", addOneWallpaper);

module.exports = router;
