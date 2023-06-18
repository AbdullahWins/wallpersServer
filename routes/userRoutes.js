// routes/userRoutes.js
const router = require("express").Router();
const {
  sendGrettings,
  getAllUsers,
  getOneUser,
  addOneUser,
  updateUserById,
} = require("../controllers/userController");

router.get("/", sendGrettings);
router.get("/users/:id", getOneUser);
router.get("/users", getAllUsers);
router.post("/users/add", addOneUser);
router.patch("/users/edit/:id", updateUserById);

module.exports = router;
