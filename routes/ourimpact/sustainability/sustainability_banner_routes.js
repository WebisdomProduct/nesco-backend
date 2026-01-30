const express = require("express");
const router = express.Router();
const multer = require("multer");

const {createSustainabilityBanner , getAllSustainabilityBanners , getSingleSustainabilityBanner , updateSustainabilityBanner , deleteSustainabilityBanner} = require("../../../controllers/ourimpact/sustainablility/sustainabliltiyController")

const upload = require("../../../middlewares/upload")

router.post("/create", upload.single("image"), createSustainabilityBanner);
router.get("/all", getAllSustainabilityBanners);
router.get("/:id", getSingleSustainabilityBanner);
router.put("/update/:id", upload.single("image"), updateSustainabilityBanner);
router.delete("/delete/:id", deleteSustainabilityBanner);

module.exports = router;
