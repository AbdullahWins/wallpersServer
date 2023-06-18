const router = require("express").Router();
const { authenticateToken } = require("../middlewares/AuthorizeUser");

const {
  getOneAdmin,
  getAdminsByType,
  getAllAdmins,
  addOneAdmin,
  updateAdminById,
  RegisterUser,
  LoginUser,
} = require("../controllers/adminController");

router.get("/admin/find/:id", authenticateToken, getOneAdmin);
router.get("/admin", authenticateToken, getAllAdmins);
router.get("/admin/types/:typeName", authenticateToken, getAdminsByType);
router.post("/admin/add", authenticateToken, addOneAdmin);
router.post("/admin/register", RegisterUser);
router.post("/admin/login", LoginUser);
router.patch("/admin/edit/:id", authenticateToken, updateAdminById);

module.exports = router;
