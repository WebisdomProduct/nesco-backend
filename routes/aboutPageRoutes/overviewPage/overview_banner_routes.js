const express = require("express");
const router = express.Router();
const {createOverviewbanner, getAllOverviewBanners , getOverviewBanner , updateOverviewBanner , deleteOverviewBanner} = require("../../../controllers/about/overview/overview_controller");
const upload = require("../../../middlewares/upload");
router.post("/overview-banner", upload.single("image"), createOverviewbanner);
router.get("/overview-banner", getAllOverviewBanners);
router.get("/overview-banner/:id", getOverviewBanner);
router.put("/overview-banner/:id", upload.single("image"), updateOverviewBanner);
router.delete("/overview-banner/:id", deleteOverviewBanner);


module.exports = router;