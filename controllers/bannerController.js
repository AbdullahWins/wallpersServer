// controllers/bannerController.js

const { ObjectId } = require("mongodb");
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

//update a banner
const updateBannerById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const { file } = req;
    const data = JSON.parse(req?.body?.data);
    const folderName = "banners";
    let updateData = {};

    if (file) {
      const fileUrl = await uploadFile(file, folderName);
      updateData = { ...updateData, fileUrl };
    }

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await bannersCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update banner");
  }
};

module.exports = { getAllBanners, addOneBanner, updateBannerById };
