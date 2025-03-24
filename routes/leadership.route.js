const express = require("express");
const {
  AddLeadership,
  GetAllLeadership,
  GetLeadershipById,
  EditLeadership,
  DeleteLeadership,
} = require("../controllers/leadership");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, AddLeadership);
router.get("/", GetAllLeadership);
router.get("/:id", GetLeadershipById);
router.put("/:id", protect, EditLeadership);
router.delete("/:id", protect, DeleteLeadership);

module.exports = router;
