const express = require("express");
const router = express.Router();

const {
  createHeroIntro,
  getAllHeroIntro,
  getHeroIntroByPageName,
  updateHeroIntro,
  deleteHeroIntro
} = require("../../../controllers/businesses/bombay-exhibition-center/hero_intro_controller");

/* ADMIN */
router.post("/create", createHeroIntro);
router.get("/get-all", getAllHeroIntro);
router.put("/update/:id", updateHeroIntro);
router.delete("/delete/:id", deleteHeroIntro);

/* PUBLIC */
router.get("/page/:pageName", getHeroIntroByPageName);

module.exports = router;
