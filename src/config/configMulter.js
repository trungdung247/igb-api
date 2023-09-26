//Configuration for Multer
const multer  = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `images/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const path = require("path");

const multerFilter = (req, file, cb) => {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Image!!");
    }
};

module.exports = {
    multerStorage,
    multerFilter
}