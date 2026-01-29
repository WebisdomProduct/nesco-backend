const express = require("express");
const router = express.Router();
const controller = require("../../controllers/lifeAtNesco/passionController");

router.post("/", controller.createPassion);
router.get("/", controller.getAllPassion);
router.get("/:id", controller.getSinglePassion);
router.put("/:id", controller.updatePassion);
router.delete("/:id", controller.deletePassion);

module.exports = router;
