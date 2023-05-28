const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = async () => {
  await client.connect();
  console.log("Connected to MongoDB");
};

const db = client.db(process.env.DATABASE_NAME);
const usersCollection = db.collection("users");
const filtersCollection = db.collection("filters");

module.exports = {
  connect,
  usersCollection,
  filtersCollection,
};
