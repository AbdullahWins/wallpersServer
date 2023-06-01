const { Storage } = require("@google-cloud/storage");
const dotenv = require("dotenv");
const { generateUniqueFilename } = require("./generateUniqueFilename");

dotenv.config();

// Create a new instance of the Firebase Storage client
const storage = new Storage({
  projectId: process.env.FIREBASE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

function uploadFile(file, folderName) {
  return new Promise((resolve, reject) => {
    const bucketName = process.env.FIRE_STORAGE_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    // Generate a unique filename
    const uniqueFilename = generateUniqueFilename(file.originalname);
    const options = {
      destination: `${folderName}/${uniqueFilename}`,
      public: true,
    };

    bucket.upload(file.path, options, (err, uploadedFile) => {
      if (err) {
        reject(err);
      } else {
        const fileUrl = uploadedFile.publicUrl();
        resolve(fileUrl);
      }
    });
  });
}

module.exports = {
  uploadFile,
};
