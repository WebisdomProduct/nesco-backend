const express = require("express");
const router = express.Router();
const {
  AddFinancials,
  GetFinancials,
  GetFinancialsById,
  EditFinancials,
  DeleteFinancialsById,
} = require("../controllers/financials/index.js");

router.post("/", AddFinancials);
router.get("/", GetFinancials);
router.get("/:id", GetFinancialsById);
router.put("/:id", EditFinancials);
router.delete("/:id", DeleteFinancialsById);

module.exports = router;
