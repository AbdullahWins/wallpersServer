const express = require("express");
const admin = require("firebase-admin");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(multer({ dest: "uploads/" }).single("file"));
dotenv.config();

//initialize firebase
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

// Import database connection
const { connect } = require("./database/db");

const routes = require("./routes/routes");
app.use(routes);

// // Import routes
// const userRoutes = require("./routes/userRoutes");
// const wallpaperRoutes = require("./routes/wallpaperRoutes");
// const ringtoneRoutes = require("./routes/ringtoneRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const bannerRoutes = require("./routes/bannerRoutes");
// const payoutRoutes = require("./routes/payoutRoutes");
// const coinPriceRoutes = require("./routes/coinPriceRoutes");
// const adNetworkRoutes = require("./routes/adNetworkRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const colorRoutes = require("./routes/colorRoutes");
// const withdrawRoutes = require("./routes/withdrawRoutes");
// const midRoutes = require("./routes/midRoutes");

// // Routes
// app.use(userRoutes);
// app.use(wallpaperRoutes);
// app.use(ringtoneRoutes);
// app.use(categoryRoutes);
// app.use(bannerRoutes);
// app.use(payoutRoutes);
// app.use(coinPriceRoutes);
// app.use(adNetworkRoutes);
// app.use(adminRoutes);
// app.use(colorRoutes);
// app.use(withdrawRoutes);
// app.use(midRoutes);

// Start server
async function start() {
  try {
    await connect();
    console.log("Connected to database");

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
