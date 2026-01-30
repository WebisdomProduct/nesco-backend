const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload");

const {
  createPerformance,
  getPerformance,
  updatePerformance,
  deletePerformance,
  getPerformanceByMainTitle
} = require("../../../controllers/ourimpact/sustainablility/sustainability_performance_controller");

router.post("/create", upload.single("image"), createPerformance);
router.get("/get", getPerformance);
router.put("/update/:id", upload.single("image"), updatePerformance);
router.delete("/delete/:id", deletePerformance);
router.get("/title/:mainTitle", getPerformanceByMainTitle);

module.exports = router;
