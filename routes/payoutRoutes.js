const router = require("express").Router();

const {
  getAllPayouts,
  getPayoutsByType,
  getOnePayout,
  addOnePayout,
  updatePayoutById,
} = require("../controllers/payoutController");

router.get("/payouts/find/:id", getOnePayout);
router.get("/payouts", getAllPayouts);
router.get("/payouts/types/:typeName", getPayoutsByType);
router.post("/payouts/add", addOnePayout);
router.patch("/payouts/edit/:id", updatePayoutById);

module.exports = router;
