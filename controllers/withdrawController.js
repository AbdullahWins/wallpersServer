// Controllers/withdrawsController.js

const { ObjectId } = require("mongodb");
const { withdrawsCollection } = require("../database/db");
// const { uploadFile } = require("../uploaders/uploadFile");

//get all withdraws
const getAllWithdraws = async (req, res) => {
  try {
    const query = {};
    const cursor = withdrawsCollection.find(query);
    const withdraws = await cursor.toArray();
    console.log(`Found ${withdraws.length} withdraws`);
    res.send(withdraws);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get withdraws by types
const getWithdrawsByType = async (req, res) => {
  try {
    const withdrawTypeName = req.params.typeName;
    const withdraws = await withdrawsCollection
      .find({ withdrawType: withdrawTypeName })
      .toArray();
    if (withdraws.length === 0) {
      res.status(404).send("No withdraws found for the specified type");
    } else {
      res.send(withdraws);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single withdraw
const getOneWithdraw = async (req, res) => {
  try {
    const withdrawId = req.params.id;
    const withdraw = await withdrawsCollection.findOne({
      _id: new ObjectId(withdrawId),
    });
    if (!withdraw) {
      res.status(404).send("withdraw not found");
    } else {
      res.send(withdraw);
      console.log(withdraw);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new Withdraw
const addOneWithdraw = async (req, res) => {
  try {
    // const { file } = req;
    const data = JSON.parse(req.body.data);
    // const folderName = "withdraws";
    // const fileUrl = await uploadFile(file, folderName);
    // const formattedData = {
    //   ...data,
    //   fileUrl,
    // };
    const formattedData = data;
    const result = await withdrawsCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`withdraw URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload withdraw");
  }
};

//update one withdraw
const updateWithdrawById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    // const { file } = req;
    const data = JSON.parse(req?.body?.data);
    // const folderName = "withdraws";
    let updateData = {};

    // if (file) {
    //   const imageUrl = await uploadFile(file, folderName);
    //   updateData = { ...updateData, imageUrl };
    // }

    if (data) {
      updateData = { ...updateData, ...data };
    }

    const result = await withdrawsCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update withdraw");
  }
};

module.exports = {
  getAllWithdraws,
  getWithdrawsByType,
  getOneWithdraw,
  addOneWithdraw,
  updateWithdrawById,
};
