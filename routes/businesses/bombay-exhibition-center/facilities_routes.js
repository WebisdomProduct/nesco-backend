const express = require("express");
const router = express.Router();

const uploadFunction = require("../../../middlewares/upload");

const {
  createFacility,
  getAllFacilities,
  getFacilitiesByPageName,
  updateFacility,
  deleteFacility
} = require("../../../controllers/businesses/bombay-exhibition-center/facilities_controller");

/* ADMIN */
router.post("/create", uploadFunction.single("image"), createFacility);
router.get("/get-all", getAllFacilities);
router.put("/update/:id", uploadFunction.single("image"), updateFacility);
router.delete("/delete/:id", deleteFacility);

/* PUBLIC */
router.get("/page/:pageName", getFacilitiesByPageName);

module.exports = router;
