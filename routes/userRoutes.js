// routes/userRoutes.js
const router = require("express").Router();
const {
  sendGrettings,
  getAllUsers,
  getOneUser,
  addOneUser,
  updateUserByEmail,
} = require("../controllers/userController");

router.get("/", sendGrettings);
router.get("/users/:email", getOneUser);
router.get("/users", getAllUsers);
router.post("/users/add", addOneUser);
router.patch("/users/edit/:email", updateUserByEmail);

module.exports = router;
