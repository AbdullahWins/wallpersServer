const express = require("express");
const router = express.Router();

const {
  getAllWithdraws,
  getWithdrawsByType,
  getOneWithdraw,
  addOneWithdraw,
  updateWithdrawById,
} = require("../controllers/withdrawController");

router.get("/withdraws/find/:id", getOneWithdraw);
router.get("/withdraws", getAllWithdraws);
router.get("/withdraws/types/:typeName", getWithdrawsByType);
router.post("/withdraws/add", addOneWithdraw);
router.patch("/withdraws/edit/:id", updateWithdrawById);

module.exports = router;
