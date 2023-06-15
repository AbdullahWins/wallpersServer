const router = require("express").Router();

const {
  getOneAdmin,
  getAdminsByType,
  getAllAdmins,
  addOneAdmin,
  updateAdminById,
  RegisterUser,
  LoginUser,
} = require("../controllers/adminController");

router.get("/admin/find/:id", getOneAdmin);
router.get("/admin", getAllAdmins);
router.get("/admin/types/:typeName", getAdminsByType);
router.post("/admin/add", addOneAdmin);
router.post("/admin/register", RegisterUser);
router.post("/admin/login", LoginUser);
router.patch("/admin/edit/:id", updateAdminById);

module.exports = router;
