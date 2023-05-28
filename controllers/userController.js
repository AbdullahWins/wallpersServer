// user controller

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

//exports
module.exports = {
  sendGrettings,
  getAllUsers,
  getOneUser,
  addOneUser,
};
