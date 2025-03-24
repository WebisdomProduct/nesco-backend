const express = require("express");
const router = express.Router();
const {
  AddFinancials,
  GetFinancials,
  GetFinancialsById,
  EditFinancials,
  DeleteFinancialsById,
} = require("../controllers/financials/index.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/", protect, AddFinancials);
router.get("/", GetFinancials);
router.get("/:id", GetFinancialsById);
router.put("/:id", protect, EditFinancials);
router.delete("/:id", protect, DeleteFinancialsById);

module.exports = router;
