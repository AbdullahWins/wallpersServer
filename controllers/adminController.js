// Controllers/adminController.js

const { ObjectId } = require("mongodb");
const { adminsCollection } = require("../database/db");
const { uploadFile } = require("../uploaders/uploadFile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/AdminModel");
const timestamp = Date.now();

//login
const LoginAdmin = async (req, res) => {
  try {
    const data = JSON.parse(req?.body?.data);
    const { email, password } = data;
    const admin = await AdminModel.findByEmail(email);
    console.log(admin);
    if (!admin) {
      return res.status(404).json({ error: "admin not found" });
    }
    const passwordMatch = await bcrypt.compare(password, admin?.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const expiresIn = "7d";
    const token = jwt.sign(
      { adminId: admin?.email },
      process.env.JWT_TOKEN_SECRET_KEY,
      { expiresIn }
    );
    res.json({ token, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//registration
const RegisterAdmin = async (req, res) => {
  try {
    const data = JSON.parse(req?.body?.data);
    const { email, password, name, ...additionalInfo } = data;
    const existingAdminCheck = await AdminModel.findByEmail(email);
    if (existingAdminCheck) {
      return res.status(409).json({ error: "Admin already exists" });
    }
    //create a new Admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.createAdmin(
      name,
      email,
      hashedPassword,
      timestamp,
      additionalInfo
    );
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
  const data = JSON.parse(req?.body?.data);
  const { email, password, name, ...additionalInfo } = data;
  try {
    const existingAdminCheck = await AdminModel.findByEmail(email);
    if (existingAdminCheck) {
      return res.status(409).json({ error: "admin already exists" });
    }
    // Create a new Admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.createAdmin(
      name,
      email,
      hashedPassword,
      timestamp,
      additionalInfo
    );
    res.status(201).json(newAdmin);
    console.log(newAdmin);
    console.log(`new admin created: ${newAdmin}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create new admin");
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
    const { email, password, name, ...additionalInfo } = data;
    const folderName = "admins";
    let updateData = { timestamp };

    if (file) {
      const imageUrl = await uploadFile(file, folderName);
      updateData = { ...updateData, imageUrl };
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData = { ...updateData, password: hashedPassword };
    }
    if (name) {
      updateData = { ...updateData, name };
    }
    if (email) {
      updateData = { ...updateData, email };
    }
    if (additionalInfo) {
      updateData = { ...updateData, additionalInfo };
    }
    const result = await adminsCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update admin");
  }
};

//delete one Admin
const deleteAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await adminsCollection.deleteOne(query);
    if (result?.deletedCount === 0) {
      console.log("no admin found with this id:", id);
      res.send("no admin found with this id!");
    } else {
      console.log("admin deleted:", id);
      res.send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete admin");
  }
};

module.exports = {
  getOneAdmin,
  getAdminsByType,
  getAllAdmins,
  addOneAdmin,
  updateAdminById,
  LoginAdmin,
  RegisterAdmin,
  deleteAdminById,
};
