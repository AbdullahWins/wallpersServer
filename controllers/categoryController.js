// Controllers/categoryController.js

const {
  wallpaperCategoriesCollection,
  ringtoneCategoriesCollection,
} = require("../database/db");
const { uploadFile } = require("../uploaders/uploadFile");

//get all RingtoneCategories
const getAllRingtoneCategories = async (req, res) => {
  try {
    const query = {};
    const cursor = ringtoneCategoriesCollection.find(query);
    const ringtones = await cursor.toArray();
    console.log(`Found ${ringtones.length} ringtone categories`);
    res.send(ringtones);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get all wallpaperCategories
const getAllwallpaperCategories = async (req, res) => {
  try {
    const query = {};
    const cursor = wallpaperCategoriesCollection.find(query);
    const wallpapers = await cursor.toArray();
    console.log(`Found ${wallpapers.length} wallpaper categories`);
    res.send(wallpapers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add one ringtone category
const addOneRingtoneCategory = async (req, res) => {
  try {
    const { file } = req;
    const data = JSON.parse(req.body.data);
    const folderName = "ringtoneCategories";
    const fileUrl = await uploadFile(file, folderName);
    const formattedData = {
      ...data,
      fileUrl,
    };
    const result = await ringtoneCategoriesCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`File URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload file");
  }
};

//add one wallpaper category
const addOneWallpaperCategory = async (req, res) => {
  try {
    const { file } = req;
    const data = JSON.parse(req.body.data);
    const folderName = "wallpaperCategories";
    const fileUrl = await uploadFile(file, folderName);
    const formattedData = {
      ...data,
      fileUrl,
    };
    const result = await wallpaperCategoriesCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`File URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload file");
  }
};

//update a ringtone category
const updateRingtoneCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const { file } = req;
    const data = JSON.parse(req?.body?.data);
    const folderName = "ringtoneCategories";
    let updateData = {};

    if (file) {
      const fileUrl = await uploadFile(file, folderName);
      updateData = { ...updateData, fileUrl };
    }

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await ringtoneCategoriesCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update banner");
  }
};

//update a wallpaper
const updateWallpaperCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const { file } = req;
    const data = JSON.parse(req?.body?.data);
    const folderName = "wallpaperCategories";
    let updateData = {};

    if (file) {
      const fileUrl = await uploadFile(file, folderName);
      updateData = { ...updateData, fileUrl };
    }

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await wallpaperCategoriesCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update banner");
  }
};

module.exports = {
  getAllRingtoneCategories,
  getAllwallpaperCategories,
  addOneRingtoneCategory,
  addOneWallpaperCategory,
  updateRingtoneCategoryById,
  updateWallpaperCategoryById,
};
