const express = require("express");
const router = express.Router();

const uploadFunction = require("../../../middlewares/upload");
const controller = require("../../../controllers/businesses/bombay-exhibition-center/bombay_banner_controller");

const bannerUpload = uploadFunction.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "mobileImage", maxCount: 1 }
]);

router.post("/create", bannerUpload, controller.createBombayBanner);
router.get("/get-all", controller.getAllBombayBanners);
router.get("/get/:pageName", controller.getBannerByPageName);
router.put("/update/:id", bannerUpload, controller.updateBombayBanner);
router.delete("/delete/:id", controller.deleteBombayBanner);

// Public
router.get("/page/:pageName", controller.getBannerByPageName);

module.exports = router;
