// controllers/wallpaperController.js

const { ObjectId } = require("mongodb");
const { wallpapersCollection } = require("../database/db");

//get all wallpapers
const getAllWallpapers = async (req, res) => {
  try {
    const query = {};
    const cursor = wallpapersCollection.find(query);
    const wallpapers = await cursor.toArray();
    console.log(`Found ${wallpapers.length} wallpapers`);
    res.send(wallpapers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get wallpapers by types
const getWallpapersByType = async (req, res) => {
  try {
    const wallpaperTypeName = req.params.typeName;
    const wallpapers = await wallpapersCollection
      .find({ wallpaperType: wallpaperTypeName })
      .toArray();
    if (wallpapers.length === 0) {
      res.status(404).send("No wallpapers found for the specified type");
    } else {
      res.send(wallpapers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get wallpapers by category
const getWallpapersByCategory = async (req, res) => {
  try {
    const wallpaperCategoryName = req.params.categoryName;
    const wallpapers = await wallpapersCollection
      .find({ wallpaperCategory: wallpaperCategoryName })
      .toArray();
    if (wallpapers.length === 0) {
      res.status(404).send("No wallpapers found for the specified category");
    } else {
      res.send(wallpapers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single wallpaper
const getOneWallpaper = async (req, res) => {
  try {
    const wallpaperId = req.params.id;
    const wallpaper = await wallpapersCollection.findOne({
      _id: new ObjectId(wallpaperId),
    });
    if (!wallpaper) {
      res.status(404).send("wallpaper not found");
    } else {
      res.send(wallpaper);
      console.log(wallpaper);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new wallpaper
const addOneWallpaper = async (req, res) => {
  console.log(req);
  try {
    const wallpaper = req.body;
    const result = await wallpapersCollection.insertOne(wallpaper);
    res.send(result);
    console.log(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getOneWallpaper,
  getWallpapersByCategory,
  getWallpapersByType,
  getAllWallpapers,
  addOneWallpaper,
};
