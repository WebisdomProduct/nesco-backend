const express = require("express");
const router = express.Router();

const {
  createCSRSecond,
  getAllCSRSecond,
  getSingleCSRSecond,
  updateCSRSecond,
  deleteCSRSecond
} = require("../../../controllers/ourimpact/csr/csrSecondController");

router.post("/", createCSRSecond);
router.get("/", getAllCSRSecond);
router.get("/:id", getSingleCSRSecond);
router.put("/:id", updateCSRSecond);
router.delete("/:id", deleteCSRSecond);

module.exports = router;
