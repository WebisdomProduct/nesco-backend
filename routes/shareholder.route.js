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

// corner Api
router.post("/corner/", AddCorner);
router.get("/corner/", GetCorner);
router.get("/corner/:id", GetCornerById);
router.put("/corner/:id", EditCorner);
router.delete("/corner/:id", DeleteCornerById);

// unclaimed api
router.post("/unclaimed/", AddUnclaimed);
router.get("/unclaimed/", GetUnclaimed);
router.get("/unclaimed/:id", GetUnclaimedById);
router.put("/unclaimed/:id", EditUnclaimed);
router.delete("/unclaimed/:id", DeleteUnclaimedById);

// documentDetail Api
router.post("/documentDetail/", AddDocumentDetail);
router.get("/documentDetail/", GetDocumentDetail);
router.get("/documentDetail/:id", GetDocumentDetailById);
router.put("/documentDetail/:id", EditDocumentDetail);
router.delete("/documentDetail/:id", DeleteDocumentDetailById);

// contact Api
router.post("/contact/", AddContact);
router.get("/contact/", GetAllContacts);
router.get("/contact/:id", GetContactById);
router.put("/contact/:id", EditContact);
router.delete("/contact/:id", DeleteContact);

module.exports = router;
