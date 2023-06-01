// controllers/RingtoneController.js

const { ObjectId } = require("mongodb");
const { ringtonesCollection } = require("../database/db");
const { uploadFile } = require("../uploaders/uploadFile");

//get all Ringtones
const getAllRingtones = async (req, res) => {
  try {
    const query = {};
    const cursor = ringtonesCollection.find(query);
    const ringtones = await cursor.toArray();
    console.log(`Found ${ringtones.length} ringtones`);
    res.send(ringtones);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get Ringtones by types
const getRingtonesByType = async (req, res) => {
  try {
    const ringtoneTypeName = req.params.typeName;
    const ringtones = await ringtonesCollection
      .find({ ringtoneType: ringtoneTypeName })
      .toArray();
    if (ringtones.length === 0) {
      res.status(404).send("No Ringtones found for the specified type");
    } else {
      res.send(ringtones);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get Ringtones by category
const getRingtonesByCategory = async (req, res) => {
  try {
    const ringtoneCategoryName = req.params.categoryName;
    const ringtones = await ringtonesCollection
      .find({ ringtoneCategory: ringtoneCategoryName })
      .toArray();
    if (ringtones.length === 0) {
      res.status(404).send("No Ringtones found for the specified category");
    } else {
      res.send(ringtones);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single Ringtone
const getOneRingtone = async (req, res) => {
  try {
    const ringtoneId = req.params.id;
    const ringtone = await ringtonesCollection.findOne({
      _id: new ObjectId(ringtoneId),
    });
    if (!ringtone) {
      res.status(404).send("ringtone not found");
    } else {
      res.send(ringtone);
      console.log(ringtone);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add one ringtone

const addOneRingtone = async (req, res) => {
  try {
    const { file } = req;
    const data = JSON.parse(req.body.data);
    const folderName = "ringtones";
    const fileUrl = await uploadFile(file, folderName);
    const formattedData = {
      ...data,
      fileUrl,
    };
    const result = await ringtonesCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`File URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload file");
  }
};

module.exports = {
  getOneRingtone,
  getRingtonesByCategory,
  getRingtonesByType,
  getAllRingtones,
  addOneRingtone,
};
