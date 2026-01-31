const express = require("express");
const router = express.Router();

const uploadFunction = require("../../../middlewares/upload");

const {
  createHall,
  getAllHalls,
  getHallsByPageName,
  updateHall,
  deleteHall
} = require("../../../controllers/businesses/bombay-exhibition-center/halls_controller");

/* ADMIN */
router.post("/create", uploadFunction.single("image"), createHall);
router.get("/get-all", getAllHalls);
router.put("/update/:id", uploadFunction.single("image"), updateHall);
router.delete("/delete/:id", deleteHall);

/* PUBLIC */
router.get("/page/:pageName", getHallsByPageName);

module.exports = router;
