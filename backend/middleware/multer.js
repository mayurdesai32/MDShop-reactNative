const multer = require('multer');

const storage = multer.memoryStorage();

// if diskstorage used it will save in local and memoryStorage is temp

const singleUpload = multer({
  storage,
}).single('file');

module.exports = singleUpload;
