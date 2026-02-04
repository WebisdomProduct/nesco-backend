const express = require("express");
const router = express.Router();

const {
  createCsrBanner,
  getAllCsrBanners,
  getSingleCsrBanner,
  updateCsrBanner,
  deleteCsrBanner,
} = require("../../../controllers/ourimpact/csr/csrBannerController");

const upload = require("../../../middlewares/upload");

// CREATE
router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 }
  ]),
  createCsrBanner
);

// GET ALL
router.get("/all", getAllCsrBanners);

// GET SINGLE
router.get("/:id", getSingleCsrBanner);

// UPDATE
router.put(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 }
  ]),
  updateCsrBanner
);

// DELETE
router.delete("/delete/:id", deleteCsrBanner);

module.exports = router;
