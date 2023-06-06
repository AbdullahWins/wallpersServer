const express = require("express");
const router = express.Router();

const {
  getOneWallpaper,
  getAllWallpapers,
  getWallpapersByCategory,
  getWallpapersByCreatorChoice,
  getWallpapersByTrending,
  getWallpapersByColor,
  getWallpapersByType,
  addOneWallpaper,
  updateWallpaperById,
} = require("../controllers/wallpaperController");

router.get("/wallpapers/find/:id", getOneWallpaper);
router.get("/wallpapers", getAllWallpapers);
router.get("/wallpapers/categories/:categoryName", getWallpapersByCategory);
router.get("/wallpapers/types/:typeName", getWallpapersByType);
router.get("/wallpapers/creatorChoice", getWallpapersByCreatorChoice);
router.get("/wallpapers/trending", getWallpapersByTrending);
router.get("/wallpapers/:color", getWallpapersByColor);
router.post("/wallpapers/add", addOneWallpaper);
router.patch("/wallpapers/edit/:id", updateWallpaperById);

module.exports = router;
