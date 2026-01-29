const express = require("express");
const router = express.Router();

const controller = require("../../controllers/lifeAtNesco/lifeVoicesController");
const upload = require("../../middlewares/upload"); // multer

router.post("/", upload.single("video"), controller.createVoice);
router.get("/", controller.getAllVoices);
router.get("/:id", controller.getVoiceById);
router.put("/:id", upload.single("video"), controller.updateVoice);
router.delete("/:id", controller.deleteVoice);

module.exports = router;