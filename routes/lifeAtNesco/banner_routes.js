const express = require("express");
const router = express.Router();

const {
  createLifeAtNescobanner,
  getAllLifeAtNescoBanners,
  getLifeAtNescoBanner,
  updateLifeAtNescoBanner,
  deleteLifeAtNescoBanner
} = require("../../controllers/lifeAtNesco/bannerController");

const upload = require("../../middlewares/upload");

/* Upload Desktop + Mobile */
const bannerUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "mobileImage", maxCount: 1 }
]);

router.post("/banner", bannerUpload, createLifeAtNescobanner);
router.get("/banner", getAllLifeAtNescoBanners);
router.get("/banner/:id", getLifeAtNescoBanner);
router.put("/banner/:id", bannerUpload, updateLifeAtNescoBanner);
router.delete("/banner/:id", deleteLifeAtNescoBanner);

module.exports = router;
