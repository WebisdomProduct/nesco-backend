const express = require("express");
const router = express.Router();

const upload = require("../../../middlewares/upload");

const {
  createStat,
  getAllStats,
  getStatsByPageName,
  updateStat,
  deleteStat
} = require("../../../controllers/businesses/bombay-exhibition-center/stats_controller");


/* ADMIN */
router.post("/create", upload.single("icon"), createStat);
router.get("/get-all", getAllStats);
router.put("/update/:id", upload.single("icon"), updateStat);
router.delete("/delete/:id", deleteStat);

/* PUBLIC */
router.get("/page/:pageName", getStatsByPageName);

module.exports = router;
