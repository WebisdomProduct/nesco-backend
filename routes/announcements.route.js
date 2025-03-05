const express = require("express");
const router = express.Router();
const {
  AddAnnounce,
  GetAnnounce,
  GetAnnounceByID,
  EditAnnounce,
  DeleteAnnounce,
} = require("../controllers/announcement/index.js");

router.post("/", AddAnnounce);
router.get("/", GetAnnounce);
router.get("/:id", GetAnnounceByID);
router.put("/:id", EditAnnounce);
router.delete("/:id", DeleteAnnounce);

module.exports = router;
