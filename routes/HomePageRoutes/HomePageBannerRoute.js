const express = require("express");
const router = express.Router();
const {createHomePageBanner , getAllHomePageBanners , getHomePageBannerById , updateHomePageBanner , deleteHomePageBanner} = require("../../controllers/HomePage/HomePageBannerController");
const upload = require("../../middlewares/upload");
router.post(
  "/home-banner",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hexaImage", maxCount: 1 },
    { name: "hexaLogo", maxCount: 1 },
  ]),
  createHomePageBanner
);

router.get("/home-banner", getAllHomePageBanners);
router.get("/home-banner/:id", getHomePageBannerById);

router.put(
  "/home-banner/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "hexaImage", maxCount: 1 },
    { name: "hexaLogo", maxCount: 1 },
  ]),
  updateHomePageBanner
);

router.delete("/home-banner/:id", deleteHomePageBanner);

module.exports = router;