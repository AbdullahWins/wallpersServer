// controllers/userController.js

const { ObjectId } = require("mongodb");
const { usersCollection } = require("../database/db");

//send grettings
const sendGrettings = async (req, res) => {
  try {
    res.send("Lmao");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const query = {};
    const cursor = usersCollection.find(query);
    console.log(`Query: ${JSON.stringify(query)}`);
    const users = await cursor.toArray();
    console.log(`Found ${users.length} users`);
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//query single user
const getOneUser = async (req, res) => {
  console.log("lol");
  try {
    const userId = req.params.id;
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
      console.log(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new user
const addOneUser = async (req, res) => {
  console.log(req);
  try {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result);
    console.log(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//update one user
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const { file } = req;
    const data = JSON.parse(req?.body?.data);
    const folderName = "users";
    let updateData = {};

    if (file) {
      const imageUrl = await uploadFile(file, folderName);
      updateData = { ...updateData, imageUrl };
    }

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await usersCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update banner");
  }
};

//exports
module.exports = {
  sendGrettings,
  getAllUsers,
  getOneUser,
  addOneUser,
  updateUserById,
};
