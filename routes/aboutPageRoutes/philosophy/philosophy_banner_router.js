const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload"); // your multer config

const {
  createPhilosophy,
  getAllPhilosophy,
  getPhilosophyById,
  updatePhilosophy,
  deletePhilosophy
} = require("../../../controllers/about/philosophy/philosophy_controller");

// GET ALL
router.get("/", getAllPhilosophy);

// CREATE
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  createPhilosophy
);

// UPDATE
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  updatePhilosophy
);

// DELETE
router.delete("/:id", deletePhilosophy);

// GET ONE
router.get("/:id", getPhilosophyById);

module.exports = router;
