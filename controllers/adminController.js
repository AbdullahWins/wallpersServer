// Controllers/adminController.js

const { ObjectId } = require("mongodb");
const { adminsCollection } = require("../database/db");
const { uploadFile } = require("../uploaders/uploadFile");
const bcrypt = require("bcrypt");
const AdminModel = require("../models/AdminModel");

const jwt = require("jsonwebtoken");

// Login endpoint
const LoginAdmin = async (req, res) => {
  try {
    // const { email, password } = req.body;

    const data = JSON.parse(req?.body?.data);
    const { email, password } = data;

    // Find the Admin by email
    const admin = await AdminModel.findByEmail(email);
    console.log(admin);

    // Check if the Admin exists
    if (!admin) {
      return res.status(404).json({ error: "admin not found" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, admin?.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const expiresIn = "7d"; // 7 days
    // Generate a JWT
    const token = jwt.sign(
      { adminId: admin?.email },
      process.env.JWT_TOKEN_SECRET_KEY,
      { expiresIn }
    );

    // Return the JWT
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const verifyJWT = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
//     // Token is valid
//     console.log(decoded); // { adminId: '123' }
//   } catch (err) {
//     // Token is invalid
//     console.error(err);
//   }
// };

// Registration endpoint
const RegisterAdmin = async (req, res) => {
  try {
    // const { name, email, password } = req.body;

    const data = JSON.parse(req?.body?.data);
    const { email, password, name, ...additionalInfo } = data;

    // Check if the Admin already exists
    const existingAdminCheck = await AdminModel.findByEmail(email);
    if (existingAdminCheck) {
      return res.status(409).json({ error: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Admin
    const newAdmin = await AdminModel.createAdmin(
      name,
      email,
      hashedPassword,
      additionalInfo
    );

    // Return the created Admin
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
    // Check if the Admin already exists
    const existingAdminCheck = await AdminModel.findByEmail(email);
    if (existingAdminCheck) {
      return res.status(409).json({ error: "admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Admin
    const newAdmin = await AdminModel.createAdmin(
      name,
      email,
      hashedPassword,
      additionalInfo
    );

    // Return the created Admin
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
  LoginAdmin,
  RegisterAdmin,
};
