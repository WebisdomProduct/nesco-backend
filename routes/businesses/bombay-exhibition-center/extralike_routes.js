const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload")

const {
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  deleteMentor,
} = require("../../../controllers/businesses/bombay-exhibition-center/extra_controller");

router.post("/", upload.single("image"), createMentor);
router.get("/", getAllMentors);
router.get("/:id", getMentorById);
router.put("/:id", upload.single("image"), updateMentor);
router.delete("/:id", deleteMentor);

module.exports = router;
