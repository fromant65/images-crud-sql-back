const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.nombre}${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({ storage: storage, preservePath: true });

module.exports = { upload };
