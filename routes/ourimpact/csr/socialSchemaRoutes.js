const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload");

const {
  createSocial,
  getAllSocial,
  getSingleSocial,
  updateSocial,
  deleteSocial,
  getSocialByMainTitle
} = require("../../../controllers/ourimpact/csr/csrSocialController");

router.post("/create", upload.single("bImage"), createSocial);
router.get("/all", getAllSocial);
router.get("/single/:id", getSingleSocial);
router.get("/main-title/:mainTitle", getSocialByMainTitle);
router.put("/update/:id", upload.single("bImage"), updateSocial);
router.delete("/delete/:id", deleteSocial);

module.exports = router;
