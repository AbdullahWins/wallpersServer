// Function to generate a unique filename (adds timestamp unix value before the filename to make it unique)
const generateUniqueFilename = (originalFilename) => {
  const timestamp = Date.now();
  const uniqueFilename = `${timestamp}_${originalFilename}`;
  return uniqueFilename;
};

module.exports = {
  generateUniqueFilename,
};
