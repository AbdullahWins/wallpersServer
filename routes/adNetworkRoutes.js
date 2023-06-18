const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/AuthorizeUser");
const {
  getAllAdNetworks,
  getOneAdNetwork,
  addOneAdNetwork,
  updateAdNetworkById,
} = require("../controllers/adNetworkController");

router.get("/adNetwork/find/:id", getOneAdNetwork);
router.get("/adNetwork", authenticateToken, getAllAdNetworks);
router.post("/adNetwork/add", addOneAdNetwork);
router.patch("/adNetwork/edit/:id", updateAdNetworkById);

module.exports = router;
