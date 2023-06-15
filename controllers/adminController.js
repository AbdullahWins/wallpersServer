// Controllers/adminController.js

const { ObjectId } = require("mongodb");
const { adminsCollection } = require("../database/db");
const { uploadFile } = require("../uploaders/uploadFile");

//get all Admin
const getAllAdmins = async (req, res) => {
  try {
    const query = {};
    const cursor = adminsCollection.find(query);
    const admins = await cursor.toArray();
    console.log(`Found ${admins.length} admins`);
    res.send(admins);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get Admin by types
const getAdminsByType = async (req, res) => {
  try {
    const adminTypeName = req.params.typeName;
    const admins = await adminsCollection
      .find({ adminType: adminTypeName })
      .toArray();
    if (admins.length === 0) {
      res.status(404).send("No admins found for the specified type");
    } else {
      res.send(admins);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single Admin
const getOneAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await adminsCollection.findOne({
      _id: new ObjectId(adminId),
    });
    if (!admin) {
      res.status(404).send("admin not found");
    } else {
      res.send(admin);
      console.log(admin);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new Admin
const addOneAdmin = async (req, res) => {
  try {
    const { file } = req;
    const data = JSON.parse(req.body.data);
    const folderName = "admins";
    const fileUrl = await uploadFile(file, folderName);
    const formattedData = {
      ...data,
      fileUrl,
    };
    const result = await adminsCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`admin URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload admin");
  }
};

//update one Admin
const updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const { file } = req;
    const data = JSON.parse(req?.body?.data);
    const folderName = "admins";
    let updateData = {};

    if (file) {
      const imageUrl = await uploadFile(file, folderName);
      updateData = { ...updateData, imageUrl };
    }

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await adminsCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update banner");
  }
};

module.exports = {
  getOneAdmin,
  getAdminsByType,
  getAllAdmins,
  addOneAdmin,
  updateAdminById,
};
