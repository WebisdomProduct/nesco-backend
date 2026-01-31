const express = require("express");
const router = express.Router();

const uploadFunction = require("../../../middlewares/upload");

const {
  createAmenities,
  getAllAmenities,
  getAmenitiesByPageName,
  updateAmenities,
  deleteAmenities
} = require("../../../controllers/businesses/bombay-exhibition-center/amenities_controller");

/* ADMIN */
router.post("/create", uploadFunction.single("image"), createAmenities);
router.get("/get-all", getAllAmenities);
router.put("/update/:id", uploadFunction.single("image"), updateAmenities);
router.delete("/delete/:id", deleteAmenities);

/* PUBLIC */
router.get("/page/:pageName", getAmenitiesByPageName);

module.exports = router;
