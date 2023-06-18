const router = require("express").Router();

const {
  getAllCoinPrices,
  getOneCoinPrice,
  addOneCoinPrice,
  updateCoinPriceById,
} = require("../controllers/coinPriceController");

router.get("/coinPrice/find/:id", getOneCoinPrice);
router.get("/coinPrice", getAllCoinPrices);
router.post("/coinPrice/add", addOneCoinPrice);
router.patch("/coinPrice/edit/:id", updateCoinPriceById);

module.exports = router;
