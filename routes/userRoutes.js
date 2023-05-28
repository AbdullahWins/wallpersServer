// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const {
  sendGrettings,
  getAllUsers,
  getOneUser,
  addOneUser,
} = require("../controllers/userController");

router.get("/", sendGrettings);
router.get("/users/:id", getOneUser);
router.get("/users", getAllUsers);
router.post("/users", addOneUser);

module.exports = router;
