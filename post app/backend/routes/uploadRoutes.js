const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const uploadImage = require("../controllers/uploadController");


router.post('/', uploadMiddleware.single('file'), uploadImage)

module.exports = router;