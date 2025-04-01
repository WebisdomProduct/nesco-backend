const express = require("express");
const router = express.Router();
const {
  createSEBI,
  getSEBIRecords,
  getSEBIRecordById,
  updateSEBIRecord,
  deleteSEBIRecord,
} = require("../controllers/sebi/index.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/", protect, createSEBI);
router.get("/", getSEBIRecords);
router.get("/:id", getSEBIRecordById);
router.put("/:id", protect, updateSEBIRecord);
router.delete("/:id", protect, deleteSEBIRecord);

module.exports = router;
