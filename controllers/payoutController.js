// Controllers/payoutsController.js

const { ObjectId } = require("mongodb");
const { payoutsCollection } = require("../database/db");
// const { uploadFile } = require("../uploaders/uploadFile");

//get all Payouts
const getAllPayouts = async (req, res) => {
  try {
    const query = {};
    const cursor = payoutsCollection.find(query);
    const payouts = await cursor.toArray();
    console.log(`Found ${payouts.length} payouts`);
    res.send(payouts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get payouts by types
const getPayoutsByType = async (req, res) => {
  try {
    const payoutTypeName = req.params.typeName.toLowerCase(); // Convert parameter to lowercase
    const payouts = await payoutsCollection
      .find({
        paymentMethod: { $regex: new RegExp(`^${payoutTypeName}$`, "i") },
      })
      .toArray();
    if (payouts.length === 0) {
      res.status(404).send("No payouts found for the specified type");
    } else {
      res.send(payouts);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single payout
const getOnePayout = async (req, res) => {
  try {
    const payoutId = req.params.id;
    const payout = await payoutsCollection.findOne({
      _id: new ObjectId(payoutId),
    });
    if (!payout) {
      res.status(404).send("payout not found");
    } else {
      res.send(payout);
      console.log(payout);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new payout
const addOnePayout = async (req, res) => {
  try {
    // const { file } = req;
    const data = JSON.parse(req.body.data);
    // const folderName = "payouts";
    // const fileUrl = await uploadFile(file, folderName);
    // const formattedData = {
    //   ...data,
    //   fileUrl,
    // };
    const formattedData = data;
    const result = await payoutsCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`payout URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload payout");
  }
};

//update one payout
const updatePayoutById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    // const { file } = req;
    const data = JSON.parse(req?.body?.data);
    // const folderName = "payouts";
    let updateData = {};

    // if (file) {
    //   const imageUrl = await uploadFile(file, folderName);
    //   updateData = { ...updateData, imageUrl };
    // }

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await payoutsCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update payout");
  }
};

module.exports = {
  getAllPayouts,
  getPayoutsByType,
  getOnePayout,
  addOnePayout,
  updatePayoutById,
};
