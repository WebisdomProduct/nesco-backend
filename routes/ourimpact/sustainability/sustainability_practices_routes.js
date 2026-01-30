const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload");

const {
  createPractice,
  getAllPractices,
  getSinglePractice,
  updatePractice,
  deletePractice
} = require("../../../controllers/ourimpact/sustainablility/sustainability_pratices_controller");

// CREATE
router.post(
  "/create",
  upload.single("image1"),
  createPractice
);

// GET ALL
router.get("/get", getAllPractices);

// GET SINGLE
router.get("/get/:id", getSinglePractice);

// UPDATE
router.put(
  "/update/:id",
  upload.single("image1"),
  updatePractice
);

// DELETE
router.delete("/delete/:id", deletePractice);

module.exports = router;
