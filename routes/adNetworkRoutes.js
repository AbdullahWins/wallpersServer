const router = require("express").Router();

const {
  getAllAdNetworks,
  getOneAdNetwork,
  addOneAdNetwork,
  updateAdNetworkById,
} = require("../controllers/adNetworkController");

router.get("/adNetwork/find/:id", getOneAdNetwork);
router.get("/adNetwork", getAllAdNetworks);
router.post("/adNetwork/add", addOneAdNetwork);
router.patch("/adNetwork/edit/:id", updateAdNetworkById);

module.exports = router;
