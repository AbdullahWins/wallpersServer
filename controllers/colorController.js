// Controllers/colorController.js

const { ObjectId } = require("mongodb");
const { colorsCollection } = require("../database/db");

//get all Color
const getAllColors = async (req, res) => {
  try {
    const query = {};
    const cursor = colorsCollection.find(query);
    const colors = await cursor.toArray();
    console.log(`Found ${colors.length} colors`);
    res.send(colors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get Colors by name
const getColorsByName = async (req, res) => {
  try {
    const colorName = req.params.name.toLowerCase();
    const colors = await colorsCollection
      .find({
        paymentMethod: { $regex: new RegExp(`^${colorName}$`, "i") },
      })
      .toArray();
    if (colors.length === 0) {
      res.status(404).send("No colors found for the specified name");
    } else {
      res.send(colors);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single Color
const getOneColor = async (req, res) => {
  try {
    const colorId = req.params.id;
    const color = await colorsCollection.findOne({
      _id: new ObjectId(colorId),
    });
    if (!color) {
      res.status(404).send("color not found");
    } else {
      res.send(color);
      console.log(color);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new Color
const addOneColor = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const formattedData = data;
    const result = await colorsCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload color");
  }
};

//update one Color
const updateColorById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const data = JSON.parse(req?.body?.data);
    let updateData = {};

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await colorsCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update color");
  }
};

module.exports = {
  getAllColors,
  getColorsByName,
  getOneColor,
  addOneColor,
  updateColorById,
};
