// const cloudinary = require("../config/cloudinaryConfig");
// const fs = require("fs");

// const uploadImage = (req, res) => {

//     const fileName = req.file.originalname;

//     if (!fileName) return res.status(400).send("no files found");

//     cloudinary.uploader.upload(`./images/${fileName}`, (error, result) => {
//         if (result) {
//             console.log(result, error);
//             fs.unlink(`./images/${fileName}`, (err) => {
//                 if (err) {
//                     console.error("Error deleting file:", err);
//                 }
//                 else {
//                     console.log(`file '${fileName}' is deleted`);
//                 }
//                 return res.status(200).send({ message: "File uploaded to Cloudinary.", url: result.secure_url, public_id: result.public_id });
//             })
//         }
//         else {
//             return res.status(500).send("Error uploading file to Cloudinary.");
//         }
//     });
// }

// module.exports = uploadImage;

const cloudinary = require("../config/cloudinaryConfig");

const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded." });
    }

    console.log("req==>", req.file);

    // Directly upload the file buffer to Cloudinary
    const result = cloudinary.uploader.upload_stream(
        (error, result) => {
            if (error) {
                return res.status(500).send("Error uploading to Cloudinary.");
            }
            // Send Cloudinary URL as a response
            res.status(200).send({ message: "File uploaded to Cloudinary.", url: result.secure_url, public_id: result.public_id });
        }
    );

    // Pipe the buffer into Cloudinary uploader stream
    result.end(req.file.buffer);
}

module.exports = uploadImage;
