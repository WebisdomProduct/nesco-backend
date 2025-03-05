const express = require("express");
const router = express.Router();
const {
  AddDetail,
  GetAllDetail,
  GetIdDetail,
  EditDetail,
  DeleteDetail,
} = require("../controllers/sebi/index.js");

router.post("/", AddDetail);
router.get("/", GetAllDetail);
router.get("/:id", GetIdDetail);
router.put("/:id", EditDetail);
router.delete("/:id", DeleteDetail);

module.exports = router;
