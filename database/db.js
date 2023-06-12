//database (mongodb)

const { MongoClient } = require("mongodb");
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
const bannersCollection = db.collection("bannersCollection");
const usersCollection = db.collection("usersCollection");
const payoutsCollection = db.collection("payoutsCollection");
const withdrawsCollection = db.collection("withdrawsCollection");
const coinPricesCollection = db.collection("coinPricesCollection");
const wallpapersCollection = db.collection("wallpapersCollection");
const ringtonesCollection = db.collection("ringtonesCollection");
const wallpaperCategoriesCollection = db.collection(
  "wallpaperCategoriesCollection"
);
const ringtoneCategoriesCollection = db.collection(
  "ringtoneCategoriesCollection"
);

module.exports = {
  connect,
  bannersCollection,
  usersCollection,
  payoutsCollection,
  withdrawsCollection,
  coinPricesCollection,
  wallpapersCollection,
  ringtonesCollection,
  wallpaperCategoriesCollection,
  ringtoneCategoriesCollection,
};
