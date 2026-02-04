const express = require("express");
const router = express.Router();

const {
  createOverviewbanner,
  getAllOverviewBanners,
  getOverviewBanner,
  updateOverviewBanner,
  deleteOverviewBanner
} = require("../../../controllers/about/overview/overview_controller");

const upload = require("../../../middlewares/upload");

// CREATE
router.post(
  "/overview-banner",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 }
  ]),
  createOverviewbanner
);

// GET ALL
router.get("/overview-banner", getAllOverviewBanners);

// GET ONE
router.get("/overview-banner/:id", getOverviewBanner);

// UPDATE
router.put(
  "/overview-banner/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 }
  ]),
  updateOverviewBanner
);

// DELETE
router.delete("/overview-banner/:id", deleteOverviewBanner);

module.exports = router;
