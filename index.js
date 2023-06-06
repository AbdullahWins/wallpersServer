const express = require("express");
const admin = require("firebase-admin");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
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

// Import routes
const userRoutes = require("./routes/userRoutes");
const wallpaperRoutes = require("./routes/wallpaperRoutes");
const ringtoneRoutes = require("./routes/ringtoneRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const midRoutes = require("./routes/midRoutes");

// Routes
app.use(userRoutes);
app.use(wallpaperRoutes);
app.use(ringtoneRoutes);
app.use(categoryRoutes);
app.use(bannerRoutes);
app.use(midRoutes);

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
