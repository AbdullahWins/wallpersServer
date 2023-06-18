// Controllers/adminController.js

const { ObjectId } = require("mongodb");
const { adminsCollection } = require("../database/db");
const { uploadFile } = require("../uploaders/uploadFile");
const bcrypt = require("bcrypt");
const AdminModel = require("../models/AdminModel");

const jwt = require("jsonwebtoken");

// Login endpoint
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await AdminModel.findByEmail(email);
    console.log(user);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const expiresIn = "7d"; // 7 days
    // Generate a JWT
    const token = jwt.sign(
      { userId: user?.email },
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
//     console.log(decoded); // { userId: '123' }
//   } catch (err) {
//     // Token is invalid
//     console.error(err);
//   }
// };

// verifyJWT(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODcwNjk1MzJ9.BYpO8yqegGLiEId3E-xZi6i-H93CqSH_R7tG67C4MVA"
// );

// Registration endpoint
const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const data = req.body;
    // console.log(data);

    // Check if the user already exists
    const existingUserCheck = await AdminModel.findByEmail(email);
    if (existingUserCheck) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await AdminModel.createUser(name, email, hashedPassword);

    // Return the created user
    res.status(201).json(newUser);
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
  LoginUser,
  RegisterUser,
};
