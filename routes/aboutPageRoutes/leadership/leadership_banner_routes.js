const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload");
const leadershipController = require("../../../controllers/about/leadership/leadership_controller");

router.post(
  "/",
  (req, res, next) => {
    console.log("hello keshu");
    next();
  },
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "featherimage", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  leadershipController.createLeadershipBanner
);

router.get("/", leadershipController.getAllLeadershipBanners);
router.get("/:id", leadershipController.getLeadershipBannerById);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "featherimage", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  leadershipController.updateLeadershipBanner
);

router.delete("/:id", leadershipController.deleteLeadershipBanner);

module.exports = router;
