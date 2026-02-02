const express = require("express");
const router = express.Router();
const sebiController = require("../controllers/sebi/index");

/* =====================================================
   📌 SEBI ROUTES - COMPLETE VERSION WITH EDIT SUPPORT
   
   IMPORTANT: Route order matters! More specific routes
   must come BEFORE generic routes to avoid conflicts.
===================================================== */

/* =====================================================
   🟢 BASE CRUD OPERATIONS
===================================================== */

// Create SEBI record
router.post("/", sebiController.createSEBI);

// Get all SEBI records
router.get("/", sebiController.getSEBIRecords);

// Get single SEBI record by ID
router.get("/:id", sebiController.getSEBIRecordById);

// Delete entire SEBI record
router.delete("/:id", sebiController.deleteSEBIRecord);

/* =====================================================
   🟡 NESTED FIELD EDIT ROUTES
   
   These handle editing of nested fields within tables
   Format: /sebi/:id/field/:tableType/:tableId
===================================================== */

router.put(
  "/:id/field/:tableType/:tableId",
  sebiController.editNestedField
);

/* =====================================================
   🟡 SINGLE-LEVEL ITEM EDIT ROUTES
   
   These handle editing of single-level items
   Format: /sebi/:id/single/:tableType/:itemId
===================================================== */

router.put(
  "/:id/single/:tableType/:itemId",
  sebiController.editSingleLevelItem
);

/* =====================================================
   🔴 NESTED FIELD DELETION ROUTES
===================================================== */

router.delete(
  "/:id/field/:tableType/:tableId/:fieldId",
  sebiController.deleteNestedField
);

/* =====================================================
   🔴 SINGLE-LEVEL ITEM DELETION ROUTES
===================================================== */

router.delete(
  "/:id/single/:tableType/:itemId",
  sebiController.deleteSingleLevelItem
);

/* =====================================================
   🔴 TABLE DELETION ROUTE
===================================================== */

router.delete(
  "/:id/table/:tableType/:tableId",
  sebiController.deleteSpecificTable
);

/* =====================================================
   🟢 FALLBACK UPDATE ROUTE (should be last)
===================================================== */

// Update SEBI record (for main fields only)
router.put("/:id", sebiController.updateSEBIRecord);

module.exports = router;