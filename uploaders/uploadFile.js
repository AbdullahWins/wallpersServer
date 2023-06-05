// file uploader
const { generateUniqueFilename } = require("./generateUniqueFilename");
const { storage } = require("../storage/firebase.config");

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

function uploadCategories(file, folderName) {
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
  uploadCategories,
};
