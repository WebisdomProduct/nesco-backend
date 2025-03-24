const express = require("express");
const router = express.Router();
const {
  AddAnnounce,
  GetAnnounce,
  GetAnnounceByID,
  EditAnnounce,
  DeleteAnnounce,
} = require("../controllers/announcement/index.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/", protect, AddAnnounce);
router.get("/", GetAnnounce);
router.get("/:id", GetAnnounceByID);
router.put("/:id", protect, EditAnnounce);
router.delete("/:id", protect, DeleteAnnounce);

module.exports = router;
