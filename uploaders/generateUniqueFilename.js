// Function to generate a unique filename
const generateUniqueFilename = (originalFilename) => {
  const timestamp = Date.now();
  const uniqueFilename = `${timestamp}_${originalFilename}`;
  return uniqueFilename;
};

module.exports = {
  generateUniqueFilename,
};
