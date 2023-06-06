// Controllers/wallpaperController.js

const { ObjectId } = require("mongodb");
const { wallpapersCollection } = require("../database/db");
const { uploadFile } = require("../uploaders/uploadFile");

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

// Get Wallpapers by creator choice
const getWallpapersByCreatorChoice = async (req, res) => {
  try {
    const wallpaperTypeName = req.params.typeName;
    const wallpapers = await wallpapersCollection
      .find({ isCreatorChoice: true })
      .toArray();
    if (wallpapers.length === 0) {
      res.status(404).send("No wallpaper is creator choice");
    } else {
      res.send(wallpapers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get Wallpapers by trending
const getWallpapersByTrending = async (req, res) => {
  try {
    const wallpaperCategoryName = req.params.categoryName;
    const wallpapers = await wallpapersCollection
      .find({ isTrending: true })
      .toArray();
    if (wallpapers.length === 0) {
      res.status(404).send("No wallpaper is trending");
    } else {
      res.send(wallpapers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get Wallpapers by color
const getWallpapersByColor = async (req, res) => {
  try {
    const color = req.params.color;

    const wallpapers = await wallpapersCollection
      .find({ colors: color })
      .toArray();
    if (wallpapers.length === 0) {
      res.status(404).send("No wallpaper has this color");
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
  try {
    const { file } = req;
    const data = JSON.parse(req.body.data);
    const folderName = "wallpapers";
    const fileUrl = await uploadFile(file, folderName);
    const formattedData = {
      ...data,
      fileUrl,
    };
    const result = await wallpapersCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`wallpaper URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload wallpaper");
  }
};

//update one wallpaper
const updateWallpaperById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const { file } = req;
    const data = JSON.parse(req?.body?.data);
    const folderName = "wallpapers";
    let updateData = {};

    if (file) {
      const imageUrl = await uploadFile(file, folderName);
      updateData = { ...updateData, imageUrl };
    }

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await wallpapersCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update banner");
  }
};

module.exports = {
  getOneWallpaper,
  getWallpapersByCategory,
  getWallpapersByCreatorChoice,
  getWallpapersByTrending,
  getWallpapersByColor,
  getWallpapersByType,
  getAllWallpapers,
  addOneWallpaper,
  updateWallpaperById,
};
