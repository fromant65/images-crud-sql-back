const express = require("express");
const router = express.Router();
const {
  getImages,
  postImage,
  deleteImage,
} = require("../controllers/imgController");
const { upload } = require("../middleware/multerStorage");
//Routes
router.get("/", getImages);
router.post("/", upload.single("imagen"), postImage);
router.post("/delete", deleteImage);

module.exports = router;
