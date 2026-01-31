const express = require("express");
const router = express.Router();

const uploadFunction = require("../../../middlewares/upload");
const bombayBannerController = require("../../../controllers/businesses/bombay-exhibition-center/bombay_banner_controller");

/* MULTIPLE FILE FIELDS */
const bannerUpload = uploadFunction.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 }
]);

/* ROUTES */

router.post(
  "/create",
  bannerUpload,
  bombayBannerController.createBombayBanner
);

router.get(
  "/get-all",
  bombayBannerController.getAllBombayBanners
);

router.get(
  "/get/:pageName",
  bombayBannerController.getBannerByPageName
);

router.put(
  "/update/:id",
  bannerUpload,
  bombayBannerController.updateBombayBanner
);

router.delete(
  "/delete/:id",
  bombayBannerController.deleteBombayBanner
);
/* PUBLIC ROUTE */
router.get(
  "/page/:pageName",
  bombayBannerController.getBannerByPageNamePublic
);


module.exports = router;
