// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images/')
//     },
//     filename: function (req, file, cb) {
//         // console.log("file", file);
//         cb(null, file.originalname) // Use the original name or change this logic for unique filenames
//     }
// })

// const upload = multer({ storage: storage })

// module.exports = upload;

const multer = require('multer');

// Use memory storage to avoid storing files on disk
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
