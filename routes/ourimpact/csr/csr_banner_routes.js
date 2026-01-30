const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createCsrBanner,
  getAllCsrBanners,
  getSingleCsrBanner,
  updateCsrBanner,
  deleteCsrBanner,
} = require("../../../controllers/ourimpact/csr/csrBannerController");

const upload = require("../../../middlewares/upload")

router.post("/create", upload.single("image"), createCsrBanner);
router.get("/all", getAllCsrBanners);
router.get("/:id", getSingleCsrBanner);
router.put("/update/:id", upload.single("image"), updateCsrBanner);
router.delete("/delete/:id", deleteCsrBanner);

module.exports = router;
