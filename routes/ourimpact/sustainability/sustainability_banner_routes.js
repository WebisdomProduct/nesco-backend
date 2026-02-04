const express = require("express");
const router = express.Router();

const {
  createsustainablilityBanner,
  getAllsustainablilityBanners,
  getSinglesustainablilityBanner,
  updatesustainablilityBanner,
  deletesustainablilityBanner,
} = require("../../../controllers/ourimpact/sustainablility/sustainabliltiyController");

const upload = require("../../../middlewares/upload");

/* Upload Both Images */
const bannerUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "mobileImage", maxCount: 1 }
]);

router.post("/create", bannerUpload, createsustainablilityBanner);
router.get("/all", getAllsustainablilityBanners);
router.get("/:id", getSinglesustainablilityBanner);
router.put("/update/:id", bannerUpload, updatesustainablilityBanner);
router.delete("/delete/:id", deletesustainablilityBanner);

module.exports = router;
