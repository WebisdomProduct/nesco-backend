const express = require("express");
const router = express.Router();
const controller = require("../../controllers/lifeAtNesco/lifeItemsController");
const upload = require("../../middlewares/upload");

router.post("/", upload.single("image"), controller.createLifeItem);
router.get("/", controller.getAllLifeItems);
router.get("/:id", controller.getLifeItemById);
router.put("/:id", upload.single("image"), controller.updateLifeItem);
router.delete("/:id", controller.deleteLifeItem);

module.exports = router;
