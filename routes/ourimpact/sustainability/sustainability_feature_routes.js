const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload")

const {
  createFeature,
  getAllFeatures,
  updateFeature,
  deleteFeature,
} = require("../../../controllers/ourimpact/sustainablility/sustainability_feature_controller");

router.post("/feature", upload.single("icon"), createFeature);
router.get("/feature", getAllFeatures);
router.put("/feature/:id", upload.single("icon"), updateFeature);
router.delete("/feature/:id", deleteFeature);

module.exports = router;
