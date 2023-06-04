// controllers/RingtoneController.js

const { bannersCollection } = require("../database/db");
const { uploadFile } = require("../uploaders/uploadFile");

//get all Banners
const getAllBanners = async (req, res) => {
  try {
    const query = {};
    const cursor = bannersCollection.find(query);
    const banners = await cursor.toArray();
    console.log(`Found ${banners.length} banners`);
    res.send(banners);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add one Banner
const addOneBanner = async (req, res) => {
  try {
    const { file } = req;
    const data = JSON.parse(req.body.data);
    const folderName = "banners";
    const fileUrl = await uploadFile(file, folderName);
    const formattedData = {
      ...data,
      fileUrl,
    };
    const result = await bannersCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`File URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload file");
  }
};

module.exports = { getAllBanners, addOneBanner };
