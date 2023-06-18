const express = require("express");
const router = express.Router();

const {
    getAllColors,
    getColorsByName,
    getOneColor,
    addOneColor,
    updateColorById,
} = require("../controllers/colorController");

router.get("/colors/find/:id", getOneColor);
router.get("/colors", getAllColors);
router.get("/colors/types/:name", getColorsByName);
router.post("/colors/add", addOneColor);
router.patch("/colors/edit/:id", updateColorById);

module.exports = router;
