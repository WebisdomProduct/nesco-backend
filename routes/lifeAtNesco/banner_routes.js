const express = require("express");
const router = express.Router();
const {createLifeAtNescobanner, getAllLifeAtNescoBanners , getLifeAtNescoBanner , updateLifeAtNescoBanner , deleteLifeAtNescoBanner} = require("../../controllers/lifeAtNesco/bannerController");
const upload = require("../../middlewares/upload");
router.post("/banner", upload.single("image"), createLifeAtNescobanner);
router.get("/banner", getAllLifeAtNescoBanners);
router.get("/banner/:id", getLifeAtNescoBanner);
router.put("/banner/:id", upload.single("image"), updateLifeAtNescoBanner);
router.delete("/banner/:id", deleteLifeAtNescoBanner);


module.exports = router;