const express = require("express");
const router = express.Router();
const {
  AddDetail,
  GetAllDetail,
  GetIdDetail,
  EditDetail,
  DeleteDetail,
} = require("../../controllers/pages/sebi/index.js");

router.post("/sebi", AddDetail);
router.get("/sebi", GetAllDetail);
router.get("/sebi/:id", GetIdDetail);
router.put("/sebi/:id", EditDetail);
router.delete("/sebi/:id", DeleteDetail);

module.exports = router;
