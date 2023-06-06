const { storage } = require("../storage/firebase.config");

async function deleteFileByUrl(fileUrl) {
  try {
    const bucket = storage.bucket();
    const fileName = fileUrl.split("/").pop();

    // Get a reference to the file
    const file = bucket.file(fileName);

    // Delete the file
    await file.delete();

    console.log("File deleted successfully");
  } catch (error) {
    console.log("Error deleting file:", error);
  }
}

module.exports = {
  deleteFileByUrl,
};
