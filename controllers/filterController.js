// controllers/filterController.js

const { ObjectId } = require("mongodb");
const { filtersCollection } = require("../database/db");

//get all filters
const getAllFilters = async (req, res) => {
  try {
    const query = {};
    const cursor = filtersCollection.find(query);
    const filters = await cursor.toArray();
    console.log(`Found ${filters.length} filters`);
    res.send(filters);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get filters by types
const getFiltersByType = async (req, res) => {
  try {
    const filterTypeName = req.params.typeName;
    const filters = await filtersCollection
      .find({ filterType: filterTypeName })
      .toArray();
    if (filters.length === 0) {
      res.status(404).send("No filters found for the specified type");
    } else {
      res.send(filters);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get filters by category
const getFiltersByCategory = async (req, res) => {
  try {
    const filterCategoryName = req.params.categoryName;
    const filters = await filtersCollection
      .find({ filterCategory: filterCategoryName })
      .toArray();
    if (filters.length === 0) {
      res.status(404).send("No filters found for the specified category");
    } else {
      res.send(filters);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get single filter
const getOneFilter = async (req, res) => {
  try {
    const filterId = req.params.id;
    const filter = await filtersCollection.findOne({
      _id: new ObjectId(filterId),
    });
    if (!filter) {
      res.status(404).send("Filter not found");
    } else {
      res.send(filter);
      console.log(filter);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//add new filter
const addOneFilter = async (req, res) => {
  console.log(req);
  try {
    const filter = req.body;
    const result = await filtersCollection.insertOne(filter);
    res.send(result);
    console.log(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getOneFilter,
  getFiltersByCategory,
  getFiltersByType,
  getAllFilters,
  addOneFilter,
};
