const express = require("express");
const {
  AddGraduates,
  GetAllGraduates,
  GetGraduatesById,
  EditGraduates,
  DeleteGraduates,
} = require("../controllers/graduates");

const router = express.Router();

router.post("/", AddGraduates);
router.get("/", GetAllGraduates);
router.get("/:id", GetGraduatesById);
router.put("/:id", EditGraduates);
router.delete("/:id", DeleteGraduates);

module.exports = router;
