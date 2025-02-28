const router = require("express").Router();
const uploadImage = require("../controllers/upload/upload-images");
const uploadDocument = require("../controllers/upload/upload-document");
const uploadMedia = require("../controllers/upload/upload-videos");

router.post("/uploadImage", uploadImage);
router.post("/uploadDocument", uploadDocument);
router.post("/uploadMedia", uploadMedia);

module.exports = router;
