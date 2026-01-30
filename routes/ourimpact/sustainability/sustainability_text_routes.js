const express = require("express");
const router = express.Router();

const {
  createText,
  getText,
  updateText,
  deleteText
} = require("../../../controllers/ourimpact/sustainablility/sustainability_text_controller");

router.post("/create", createText);
router.get("/get", getText);
router.put("/update/:id", updateText);
router.delete("/delete/:id", deleteText);

module.exports = router;
