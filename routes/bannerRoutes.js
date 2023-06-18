const express = require("express");
const router = express.Router();

const {
  getAllBanners,
  addOneBanner,
  updateBannerById,
} = require("../controllers/bannerController");

router.get("/banners", getAllBanners);
router.post("/banners/add", addOneBanner);
router.patch("/banners/edit/:id", updateBannerById);

module.exports = router;
