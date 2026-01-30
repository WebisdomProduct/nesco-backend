const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload")

const {
  createStakeholder,
  getStakeholder,
  updateStakeholder,
  deleteStakeholder, 
  getStakeholderByMainTitle
} = require("../../../controllers/ourimpact/sustainablility/sustainabilityStakeHolder_controller");

router.post("/create", upload.single("image"), createStakeholder);
router.get("/get", getStakeholder);
router.put("/update/:id", upload.single("image"), updateStakeholder);
router.delete("/delete/:id", deleteStakeholder);
router.get('/title/:mainTitle', getStakeholderByMainTitle);

module.exports = router;
