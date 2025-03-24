const express = require("express");
const router = express.Router();

const {
  AddCorner,
  GetCorner,
  GetCornerById,
  EditCorner,
  DeleteCornerById,
} = require("../controllers/shareholder/Corner.controller.js");

const {
  AddUnclaimed,
  GetUnclaimed,
  GetUnclaimedById,
  EditUnclaimed,
  DeleteUnclaimedById,
} = require("../controllers/shareholder/unClaimed.controller.js");
const {
  AddDocumentDetail,
  GetDocumentDetail,
  GetDocumentDetailById,
  EditDocumentDetail,
  DeleteDocumentDetailById,
} = require("../controllers/shareholder/documentDetail.controller.js");
const {
  AddContact,
  GetAllContacts,
  GetContactById,
  EditContact,
  DeleteContact,
} = require("../controllers/shareholder/contact.controller.js");
const { protect } = require("../middlewares/authMiddleware.js");

// corner Api
router.post("/corner/", protect, AddCorner);
router.get("/corner/", GetCorner);
router.get("/corner/:id", GetCornerById);
router.put("/corner/:id", protect, EditCorner);
router.delete("/corner/:id", protect, DeleteCornerById);

// unclaimed api
router.post("/unclaimed/", protect, AddUnclaimed);
router.get("/unclaimed/", GetUnclaimed);
router.get("/unclaimed/:id", GetUnclaimedById);
router.put("/unclaimed/:id", protect, EditUnclaimed);
router.delete("/unclaimed/:id", protect, DeleteUnclaimedById);

// documentDetail Api
router.post("/documentDetail/", protect, AddDocumentDetail);
router.get("/documentDetail/", GetDocumentDetail);
router.get("/documentDetail/:id", GetDocumentDetailById);
router.put("/documentDetail/:id", protect, EditDocumentDetail);
router.delete("/documentDetail/:id", protect, DeleteDocumentDetailById);

// contact Api
router.post("/contact/", protect, AddContact);
router.get("/contact/", GetAllContacts);
router.get("/contact/:id", GetContactById);
router.put("/contact/:id", protect, EditContact);
router.delete("/contact/:id", protect, DeleteContact);

module.exports = router;
