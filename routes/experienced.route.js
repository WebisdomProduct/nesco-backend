const express = require("express");
const {
  AddExperienced,
  GetAllExperienced,
  GetExperiencedById,
  EditExperienced,
  DeleteExperienced,
} = require("../controllers/experienced/index");

const router = express.Router();

router.post("/", AddExperienced);
router.get("/", GetAllExperienced);
router.get("/:id", GetExperiencedById);
router.put("/:id", EditExperienced);
router.delete("/:id", DeleteExperienced);

module.exports = router;
