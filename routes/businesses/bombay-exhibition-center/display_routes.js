const express = require("express");
const router = express.Router();

const uploadFunction = require("../../../middlewares/upload");

const {
    createDisplay,
    getAllDisplays,
    getDisplaysByPageName,
    updateDisplay,
    deleteDisplay
} = require("../../../controllers/businesses/bombay-exhibition-center/display_controller");

/* ADMIN */
router.post("/create", uploadFunction.single("image"), createDisplay);
router.get("/get-all", getAllDisplays);
router.put("/update/:id", uploadFunction.single("image"), updateDisplay);
router.delete("/delete/:id", deleteDisplay);

/* PUBLIC */
router.get("/page/:pageName", getDisplaysByPageName);

module.exports = router;
