const express = require("express");
const {
  AddInternship,
  GetAllInternship,
  GetInternshipById,
  EditInternship,
  DeleteInternship,
} = require("../controllers/internship");
const router = express.Router();

router.post("/", AddInternship);
router.get("/", GetAllInternship);
router.get("/:id", GetInternshipById);
router.put("/:id", EditInternship);
router.delete("/:id", DeleteInternship);

module.exports = router;
