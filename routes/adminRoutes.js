const express = require("express");
const router = express.Router();

const {
  getOneAdmin,
  getAdminsByType,
  getAllAdmins,
  addOneAdmin,
  updateAdminById,
} = require("../controllers/adminController");

router.get("/wallpapers/find/:id", getOneAdmin);
router.get("/wallpapers", getAllAdmins);
router.get("/wallpapers/types/:typeName", getAdminsByType);
router.post("/wallpapers/add", addOneAdmin);
router.patch("/wallpapers/edit/:id", updateAdminById);

module.exports = router;
