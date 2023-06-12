// Controllers/coinPriceController.js

const { ObjectId } = require("mongodb");
const { coinPricesCollection } = require("../database/db");

//get all coinPrices
const getAllCoinPrices = async (req, res) => {
  try {
    const query = {};
    const cursor = coinPricesCollection.find(query);
    const coinPrices = await cursor.toArray();
    console.log(`Found ${coinPrices.length} coinPrices`);
    res.send(coinPrices);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single CoinPrice
const getOneCoinPrice = async (req, res) => {
  try {
    const coinPriceId = req.params.id;
    const coinPrice = await coinPricesCollection.findOne({
      _id: new ObjectId(coinPriceId),
    });
    if (!coinPrice) {
      res.status(404).send("coinPrice not found");
    } else {
      res.send(coinPrice);
      console.log(coinPrice);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new CoinPrice
const addOneCoinPrice = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const formattedData = data;
    const result = await coinPricesCollection.insertOne(formattedData);
    res.send(result);
    console.log(formattedData);
    console.log(`coinPrice URL: ${fileUrl}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload coinPrice");
  }
};

//update one CoinPrice
const updateCoinPriceById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const data = JSON.parse(req?.body?.data);
    let updateData = {};
    if (data) {
      updateData = { ...updateData, ...data };
    }
    const result = await coinPricesCollection.updateOne(query, {
      $set: updateData,
    });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update payout");
  }
};

module.exports = {
  getAllCoinPrices,
  getOneCoinPrice,
  addOneCoinPrice,
  updateCoinPriceById,
};
