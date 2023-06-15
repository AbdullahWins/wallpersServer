// Controllers/adNetworkController.js

const { ObjectId } = require("mongodb");
const { adNetworksCollection } = require("../database/db");

//get all adNetworks
const getAllAdNetworks = async (req, res) => {
  try {
    const query = {};
    const cursor = adNetworksCollection.find(query);
    const adNetwork = await cursor.toArray();
    console.log(`Found ${adNetwork.length} adNetworks`);
    res.send(adNetwork);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single adNetwork
const getOneAdNetwork = async (req, res) => {
  try {
    const adNetworkId = req.params.id;
    const adNetwork = await adNetworksCollection.findOne({
      _id: new ObjectId(adNetworkId),
    });
    if (!adNetwork) {
      res.status(404).send("adNetwork not found");
    } else {
      console.log("user asked for this one: ", adNetwork);
      res.send(adNetwork);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new adNetwork
const addOneAdNetwork = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const formattedData = data;
    const result = await adNetworksCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`adNetwork URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload adNetwork");
  }
};

//update one adNetwork
const updateAdNetworkById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const data = JSON.parse(req?.body?.data);
    let updateData = {};
    if (data) {
      updateData = { ...updateData, ...data };
    }
    const result = await adNetworksCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update adNetwork");
  }
};

module.exports = {
  getAllAdNetworks,
  getOneAdNetwork,
  addOneAdNetwork,
  updateAdNetworkById,
};
