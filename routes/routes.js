const express = require("express");
const router = express.Router();

// Import routes
const userRoutes = require("./userRoutes");
const wallpaperRoutes = require("./wallpaperRoutes");
const ringtoneRoutes = require("./ringtoneRoutes");
const categoryRoutes = require("./categoryRoutes");
const bannerRoutes = require("./bannerRoutes");
const payoutRoutes = require("./payoutRoutes");
const coinPriceRoutes = require("./coinPriceRoutes");
const adNetworkRoutes = require("./adNetworkRoutes");
const adminRoutes = require("./adminRoutes");
const colorRoutes = require("./colorRoutes");
const withdrawRoutes = require("./withdrawRoutes");
const midRoutes = require("./midRoutes");

// Routes
router.use(userRoutes);
router.use(wallpaperRoutes);
router.use(ringtoneRoutes);
router.use(categoryRoutes);
router.use(bannerRoutes);
router.use(payoutRoutes);
router.use(coinPriceRoutes);
router.use(adNetworkRoutes);
router.use(adminRoutes);
router.use(colorRoutes);
router.use(withdrawRoutes);
router.use(midRoutes);

module.exports = router;
