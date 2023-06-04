const express = require("express");
const router = express.Router();

const {
  getAllBanners,
  addOneBanner,
} = require("../controllers/bannerController");

router.get("/banners", getAllBanners);
router.post("/banners/add", addOneBanner);

module.exports = router;
