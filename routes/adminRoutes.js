const router = require("express").Router();
const { authenticateToken } = require("../middlewares/AuthorizeAdmin");

const {
  getOneAdmin,
  getAdminsByType,
  getAllAdmins,
  addOneAdmin,
  updateAdminById,
  RegisterAdmin,
  LoginAdmin,
} = require("../controllers/adminController");

router.get("/admin/find/:id", authenticateToken, getOneAdmin);
router.get("/admin", authenticateToken, getAllAdmins);
router.get("/admin/types/:typeName", authenticateToken, getAdminsByType);
router.post("/admin/add", authenticateToken, addOneAdmin);
router.post("/admin/register", RegisterAdmin);
router.post("/admin/login", LoginAdmin);
router.patch("/admin/edit/:id", authenticateToken, updateAdminById);

module.exports = router;
