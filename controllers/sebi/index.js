const mongoose = require("mongoose");
const SEBI = require("../../models/sebi/index");

/* =====================================================
   🔹 UTILITY HELPERS
===================================================== */

/**
 * Normalize year to consistent string format
 */
const normalizeYear = (year) => {
  if (!year) return "";
  return String(year).trim();
};

/**
 * Convert string dates to JavaScript Date objects
 */
const processNestedDates = (data) => {
  // Process PDF Tables dates
  if (Array.isArray(data.pdfTables)) {
    data.pdfTables.forEach((table) => {
      if (Array.isArray(table.fields)) {
        table.fields.forEach((field) => {
          if (field.pdfDate && typeof field.pdfDate === "string") {
            field.pdfDate = new Date(field.pdfDate);
          }
        });
      }
    });
  }

  // Process Document All dates
  if (Array.isArray(data.documentAll)) {
    data.documentAll.forEach((doc) => {
      if (Array.isArray(doc.documentfields)) {
        doc.documentfields.forEach((field) => {
          if (field.documentDate && typeof field.documentDate === "string") {
            field.documentDate = new Date(field.documentDate);
          }
        });
      }
    });
  }
};

/**
 * Transform position table with proper ObjectId handling
 */
const transformPositionTable = (tables = []) => {
  if (!Array.isArray(tables)) return [];

  return tables.map((table) => ({
    tablePositionTitle: table.tablePositionTitle || "",
    fields: Array.isArray(table.fields)
      ? table.fields.map((field) => ({
          name1: field.name1 || "",
          position: field.position || "",
          _id: field._id || new mongoose.Types.ObjectId(),
        }))
      : [],
    _id: table._id || new mongoose.Types.ObjectId(),
  }));
};

/**
 * Check if field already exists in array (for PDF tables)
 */
const isPdfFieldDuplicate = (existingFields, newField) => {
  return existingFields.some(
    (f) =>
      f.quater === newField.quater &&
      f.pdfName === newField.pdfName &&
      normalizeYear(f.pdfYear) === normalizeYear(newField.pdfYear)
  );
};

/**
 * Merge or add PDF table fields by year - FIXED
 */
const mergePdfTables = (existingTables, incomingTables) => {
  if (!Array.isArray(incomingTables)) return existingTables;
  if (!Array.isArray(existingTables)) existingTables = [];

  incomingTables.forEach((incoming) => {
    const incomingYear = normalizeYear(incoming.pdfYear);

    if (!incomingYear) return; // Skip if no year

    // Find existing table by year using findIndex
    const existingTableIndex = existingTables.findIndex(
      (t) => normalizeYear(t.pdfYear) === incomingYear
    );

    if (existingTableIndex !== -1) {
      // Year exists - append fields to existing year
      const existingTable = existingTables[existingTableIndex];
      
      if (Array.isArray(incoming.fields)) {
        incoming.fields.forEach((field) => {
          if (!isPdfFieldDuplicate(existingTable.fields, field)) {
            existingTable.fields.push({
              pdfName: field.pdfName || "",
              pdfFile: field.pdfFile || "",
              quater: field.quater || "",
              pdfDate: field.pdfDate || null,
              _id: field._id || new mongoose.Types.ObjectId(),
            });
          }
        });
      }
    } else {
      // Year doesn't exist - add new year table
      existingTables.push({
        pdfYear: incomingYear,
        fields: Array.isArray(incoming.fields)
          ? incoming.fields.map((f) => ({
              pdfName: f.pdfName || "",
              pdfFile: f.pdfFile || "",
              quater: f.quater || "",
              pdfDate: f.pdfDate || null,
              _id: f._id || new mongoose.Types.ObjectId(),
            }))
          : [],
        _id: incoming._id || new mongoose.Types.ObjectId(),
      });
    }
  });

  return existingTables;
};

/**
 * Merge or add address tables by title - FIXED
 */
const mergeAddressTables = (existingTables, incomingTables) => {
  if (!Array.isArray(incomingTables)) return existingTables;
  if (!Array.isArray(existingTables)) existingTables = [];

  incomingTables.forEach((incoming) => {
    if (!incoming.tableAddressTitle) return;

    const existingTableIndex = existingTables.findIndex(
      (a) => a.tableAddressTitle === incoming.tableAddressTitle
    );

    if (existingTableIndex !== -1) {
      // Table exists - append fields to existing table
      const existingTable = existingTables[existingTableIndex];
      
      if (Array.isArray(incoming.fields)) {
        incoming.fields.forEach((field) => {
          existingTable.fields.push({
            ...field,
            _id: field._id || new mongoose.Types.ObjectId(),
          });
        });
      }
    } else {
      // Table doesn't exist - add new address table
      existingTables.push({
        tableAddressTitle: incoming.tableAddressTitle,
        fields: Array.isArray(incoming.fields)
          ? incoming.fields.map((f) => ({
              ...f,
              _id: f._id || new mongoose.Types.ObjectId(),
            }))
          : [],
        _id: incoming._id || new mongoose.Types.ObjectId(),
      });
    }
  });

  return existingTables;
};

/**
 * Merge or add document all by year - FIXED TO PREVENT DUPLICATES
 */
const mergeDocumentAll = (existingDocs, incomingDocs) => {
  if (!Array.isArray(incomingDocs)) return existingDocs;
  if (!Array.isArray(existingDocs)) existingDocs = [];

  incomingDocs.forEach((incoming) => {
    const incomingYear = normalizeYear(incoming.year);

    if (!incomingYear) return; // Skip if no year

    // Find existing document by year using findIndex
    const existingDocIndex = existingDocs.findIndex(
      (d) => normalizeYear(d.year) === incomingYear
    );

    if (existingDocIndex !== -1) {
      // Year exists - append document fields to existing year
      const existingDoc = existingDocs[existingDocIndex];
      
      if (Array.isArray(incoming.documentfields)) {
        incoming.documentfields.forEach((field) => {
          // Add the new document field with a new ObjectId
          existingDoc.documentfields.push({
            documentDate: field.documentDate || null,
            documentName: field.documentName || "",
            documentFile: field.documentFile || "",
            _id: field._id || new mongoose.Types.ObjectId(),
          });
        });
      }
    } else {
      // Year doesn't exist - add new year document
      existingDocs.push({
        year: incomingYear,
        documentfields: Array.isArray(incoming.documentfields)
          ? incoming.documentfields.map((f) => ({
              documentDate: f.documentDate || null,
              documentName: f.documentName || "",
              documentFile: f.documentFile || "",
              _id: f._id || new mongoose.Types.ObjectId(),
            }))
          : [],
        _id: incoming._id || new mongoose.Types.ObjectId(),
      });
    }
  });

  return existingDocs;
};

/* =====================================================
   🟢 CREATE / APPEND SEBI - FIXED
===================================================== */

exports.createSEBI = async (req, res) => {
  try {
    const data = req.body;

    console.log("📥 CREATE SEBI - Incoming data:", JSON.stringify(data, null, 2));

    // Validation
    if (!data.title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // Process dates
    processNestedDates(data);

    // Check if SEBI record with this title exists
    let sebi = await SEBI.findOne({ title: data.title });

    /* ================= CREATE NEW RECORD ================= */
    if (!sebi) {
      console.log("✅ Creating NEW SEBI record for title:", data.title);
      
      const newSEBI = new SEBI(data);
      await newSEBI.save();

      return res.status(201).json({
        success: true,
        message: "SEBI record created successfully",
        data: newSEBI,
      });
    }

    /* ================= UPDATE EXISTING RECORD ================= */
    console.log("🔄 Updating EXISTING SEBI record for title:", data.title);
    console.log("📊 Existing documentAll BEFORE merge:", JSON.stringify(sebi.documentAll, null, 2));

    // Update basic fields
    if (data.description) sebi.description = data.description;
    if (data.image) sebi.image = data.image;

    // Merge PDF Tables (year-safe append)
    if (data.pdfTables) {
      console.log("🔄 Merging pdfTables...");
      sebi.pdfTables = mergePdfTables(sebi.pdfTables, data.pdfTables);
    }

    // Merge Address Tables (title-safe append)
    if (data.addressTables) {
      console.log("🔄 Merging addressTables...");
      sebi.addressTables = mergeAddressTables(
        sebi.addressTables,
        data.addressTables
      );
    }

    // Replace Position Table
    if (data.positionTable) {
      console.log("🔄 Replacing positionTable...");
      sebi.positionTable = transformPositionTable(data.positionTable);
    }

    // Merge Document All (year-safe append) - FIXED
    if (data.documentAll) {
      console.log("🔄 Merging documentAll...");
      console.log("📊 Incoming documentAll:", JSON.stringify(data.documentAll, null, 2));
      
      sebi.documentAll = mergeDocumentAll(
        sebi.documentAll,
        data.documentAll
      );
      
      console.log("📊 documentAll AFTER merge:", JSON.stringify(sebi.documentAll, null, 2));
    }

    // Append Document Links (no year checking needed)
    if (data.documentLink && Array.isArray(data.documentLink)) {
      console.log("🔄 Appending documentLink...");
      data.documentLink.forEach((link) => {
        sebi.documentLink.push({
          DocumentName: link.DocumentName || "",
          link: link.link || "",
          _id: link._id || new mongoose.Types.ObjectId(),
        });
      });
    }

    // Append Document PDFs (no year checking needed)
    if (data.documentPdf && Array.isArray(data.documentPdf)) {
      console.log("🔄 Appending documentPdf...");
      data.documentPdf.forEach((pdf) => {
        sebi.documentPdf.push({
          DocumentPdfName: pdf.DocumentPdfName || "",
          documentPdfFile: pdf.documentPdfFile || "",
          _id: pdf._id || new mongoose.Types.ObjectId(),
        });
      });
    }

    sebi.updatedAt = Date.now();
    await sebi.save();

    console.log("✅ SEBI record updated successfully");

    res.status(200).json({
      success: true,
      message: "SEBI record updated successfully",
      data: sebi,
    });
  } catch (err) {
    console.error("❌ CREATE/UPDATE SEBI ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create/update SEBI record",
      error: err.message,
    });
  }
};

// Edit nested field (addressTables, positionTable, pdfTables, documentAll)
exports.editNestedField = async (req, res) => {
  try {
    const { id, tableType, tableId } = req.params;
    const data = req.body;

    console.log("EDIT NESTED FIELD - Params:", { id, tableType, tableId }, "Body:", data);

    // Validation
    if (!id || !tableType || !tableId) {
      return res.status(400).json({
        success: false,
        message: "SEBI ID, table type, and table ID are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(tableId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI ID or table ID",
      });
    }

    // Find the record
    const record = await SEBI.findById(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    // Process dates if needed
    if (typeof processNestedDates === "function") processNestedDates(data);

    // Update based on table type
    switch (tableType) {
      case "addressTables": {
        const table = record.addressTables.id(tableId);
        if (!table) {
          return res.status(404).json({
            success: false,
            message: "Address table not found",
          });
        }

        if (data.addressTables && data.addressTables[0]) {
          const updateData = data.addressTables[0];
          if (updateData.tableAddressTitle !== undefined) table.tableAddressTitle = updateData.tableAddressTitle;
          if (updateData.title !== undefined) table.title = updateData.title;
          if (updateData.fields) table.fields = updateData.fields;
        }
        break;
      }

      case "positionTable": {
        const table = record.positionTable.id(tableId);
        if (!table) {
          return res.status(404).json({
            success: false,
            message: "Position table not found",
          });
        }

        if (data.positionTable && data.positionTable[0]) {
          const updateData = data.positionTable[0];
          if (updateData.tablePositionTitle !== undefined) table.tablePositionTitle = updateData.tablePositionTitle;
          if (updateData.title !== undefined) table.title = updateData.title;
          if (updateData.fields) table.fields = updateData.fields;
        }
        break;
      }

      case "pdfTables": {
        const table = record.pdfTables.id(tableId);
        if (!table) {
          return res.status(404).json({
            success: false,
            message: "PDF table not found",
          });
        }

        if (data.pdfTables && data.pdfTables[0]) {
          const updateData = data.pdfTables[0];
          if (updateData.pdfYear !== undefined) table.pdfYear = updateData.pdfYear;
          if (updateData.fields) table.fields = updateData.fields;
        }
        break;
      }

      case "documentAll": {
        const doc = record.documentAll.id(tableId);
        if (!doc) {
          return res.status(404).json({
            success: false,
            message: "Document not found",
          });
        }

        if (data.documentAll && data.documentAll[0]) {
          const updateData = data.documentAll[0];
          if (updateData.year !== undefined) doc.year = updateData.year;
          if (updateData.documentfields) doc.documentfields = updateData.documentfields;
        }
        break;
      }

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid table type",
        });
    }

    // Update main title if provided
    if (data.title !== undefined) {
      record.title = data.title;
    }

    record.updatedAt = Date.now();
    await record.save();

    res.status(200).json({
      success: true,
      message: "Nested field updated successfully",
      data: record,
    });
  } catch (err) {
    console.error("EDIT NESTED FIELD ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to edit nested field",
      error: err.message,
    });
  }
};

// Edit single-level item (documentLink, documentPdf)
exports.editSingleLevelItem = async (req, res) => {
  try {
    const { id, tableType, itemId } = req.params;
    const data = req.body;

    console.log("EDIT SINGLE ITEM - Params:", { id, tableType, itemId }, "Body:", data);

    // Validation
    if (!id || !tableType || !itemId) {
      return res.status(400).json({
        success: false,
        message: "SEBI ID, table type, and item ID are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI ID or item ID",
      });
    }

    // Find the record
    const record = await SEBI.findById(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    // Update based on table type
    switch (tableType) {
      case "documentLink": {
        const item = record.documentLink.id(itemId);
        if (!item) {
          return res.status(404).json({
            success: false,
            message: "Document link not found",
          });
        }

        if (data.documentLink && data.documentLink[0]) {
          const updateData = data.documentLink[0];
          if (updateData.DocumentName !== undefined) item.DocumentName = updateData.DocumentName;
          if (updateData.link !== undefined) item.link = updateData.link;
        }
        break;
      }

      case "documentPdf": {
        const item = record.documentPdf.id(itemId);
        if (!item) {
          return res.status(404).json({
            success: false,
            message: "Document PDF not found",
          });
        }

        if (data.documentPdf && data.documentPdf[0]) {
          const updateData = data.documentPdf[0];
          if (updateData.DocumentPdfName !== undefined) item.DocumentPdfName = updateData.DocumentPdfName;
          if (updateData.documentPdfFile !== undefined) item.documentPdfFile = updateData.documentPdfFile;
        }
        break;
      }

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid table type",
        });
    }

    // Update main title if provided
    if (data.title !== undefined) {
      record.title = data.title;
    }

    record.updatedAt = Date.now();
    await record.save();

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: record,
    });
  } catch (err) {
    console.error("EDIT SINGLE ITEM ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to edit item",
      error: err.message,
    });
  }
};

/* =====================================================
   🔵 GET ALL SEBI RECORDS
===================================================== */

exports.getSEBIRecords = async (req, res) => {
  try {
    const records = await SEBI.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (err) {
    console.error("GET SEBI RECORDS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch SEBI records",
      error: err.message,
    });
  }
};

/* =====================================================
   🔵 GET SEBI RECORD BY ID
===================================================== */

exports.getSEBIRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI record ID",
      });
    }

    const record = await SEBI.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (err) {
    console.error("GET SEBI RECORD BY ID ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch SEBI record",
      error: err.message,
    });
  }
};

/* =====================================================
   🟠 UPDATE SEBI RECORD (SMART UPDATE)
===================================================== */

exports.updateSEBIRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI record ID",
      });
    }

    // Find existing record
    const record = await SEBI.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    // Process dates
    processNestedDates(data);

    // Update basic fields
    if (data.title !== undefined) record.title = data.title;
    if (data.description !== undefined) record.description = data.description;
    if (data.image !== undefined) record.image = data.image;

    // Smart update for PDF Tables
    if (data.pdfTables !== undefined) {
      if (data.replacePdfTables) {
        // Complete replacement
        record.pdfTables = data.pdfTables.map((table) => ({
          pdfYear: normalizeYear(table.pdfYear),
          fields: Array.isArray(table.fields)
            ? table.fields.map((f) => ({
                pdfName: f.pdfName || "",
                pdfFile: f.pdfFile || "",
                quater: f.quater || "",
                pdfDate: f.pdfDate || null,
                _id: f._id || new mongoose.Types.ObjectId(),
              }))
            : [],
          _id: table._id || new mongoose.Types.ObjectId(),
        }));
      } else {
        // Merge mode (default)
        record.pdfTables = mergePdfTables(record.pdfTables, data.pdfTables);
      }
    }

    // Smart update for Address Tables
    if (data.addressTables !== undefined) {
      if (data.replaceAddressTables) {
        // Complete replacement
        record.addressTables = data.addressTables.map((table) => ({
          tableAddressTitle: table.tableAddressTitle || "",
          fields: Array.isArray(table.fields)
            ? table.fields.map((f) => ({
                ...f,
                _id: f._id || new mongoose.Types.ObjectId(),
              }))
            : [],
          _id: table._id || new mongoose.Types.ObjectId(),
        }));
      } else {
        // Merge mode (default)
        record.addressTables = mergeAddressTables(
          record.addressTables,
          data.addressTables
        );
      }
    }

    // Update Position Table (always replace)
    if (data.positionTable !== undefined) {
      record.positionTable = transformPositionTable(data.positionTable);
    }

    // Smart update for Document All
    if (data.documentAll !== undefined) {
      if (data.replaceDocumentAll) {
        // Complete replacement
        record.documentAll = data.documentAll.map((doc) => ({
          year: normalizeYear(doc.year),
          documentfields: Array.isArray(doc.documentfields)
            ? doc.documentfields.map((f) => ({
                ...f,
                _id: f._id || new mongoose.Types.ObjectId(),
              }))
            : [],
          _id: doc._id || new mongoose.Types.ObjectId(),
        }));
      } else {
        // Merge mode (default)
        record.documentAll = mergeDocumentAll(
          record.documentAll,
          data.documentAll
        );
      }
    }

    record.updatedAt = Date.now();
    await record.save();

    res.status(200).json({
      success: true,
      message: "SEBI record updated successfully",
      data: record,
    });
  } catch (err) {
    console.error("UPDATE SEBI RECORD ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update SEBI record",
      error: err.message,
    });
  }
};

/* =====================================================
   🟠 UPDATE SPECIFIC TABLE FIELD
===================================================== */

exports.updateSpecificField = async (req, res) => {
  try {
    const { id } = req.params;
    const { tableType, tableId, fieldId, fieldData } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI record ID",
      });
    }

    const record = await SEBI.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    // Determine which table to update
    let table;
    switch (tableType) {
      case "pdfTables":
        table = record.pdfTables.id(tableId);
        break;
      case "addressTables":
        table = record.addressTables.id(tableId);
        break;
      case "positionTable":
        table = record.positionTable.id(tableId);
        break;
      case "documentAll":
        table = record.documentAll.id(tableId);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid table type",
        });
    }

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    // Update specific field
    const field = table.fields
      ? table.fields.id(fieldId)
      : table.documentfields?.id(fieldId);

    if (!field) {
      return res.status(404).json({
        success: false,
        message: "Field not found",
      });
    }

    // Update field data
    Object.assign(field, fieldData);
    record.updatedAt = Date.now();
    await record.save();

    res.status(200).json({
      success: true,
      message: "Field updated successfully",
      data: record,
    });
  } catch (err) {
    console.error("UPDATE SPECIFIC FIELD ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update field",
      error: err.message,
    });
  }
};

/* =====================================================
   🔴 DELETE SEBI RECORD
===================================================== */

exports.deleteSEBIRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI record ID",
      });
    }

    const deleted = await SEBI.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "SEBI record deleted successfully",
      data: deleted,
    });
  } catch (err) {
    console.error("DELETE SEBI RECORD ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete SEBI record",
      error: err.message,
    });
  }
};

/* =====================================================
   🔴 DELETE SPECIFIC TABLE
===================================================== */

exports.deleteSpecificTable = async (req, res) => {
  try {
    const { id, tableType, tableId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI record ID",
      });
    }

    const record = await SEBI.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    // Remove specific table using pull() method
    switch (tableType) {
      case "pdfTables":
        record.pdfTables.pull(tableId);
        break;
      case "addressTables":
        record.addressTables.pull(tableId);
        break;
      case "positionTable":
        record.positionTable.pull(tableId);
        break;
      case "documentAll":
        record.documentAll.pull(tableId);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid table type",
        });
    }

    record.updatedAt = Date.now();
    await record.save();

    res.status(200).json({
      success: true,
      message: "Table deleted successfully",
      data: record,
    });
  } catch (err) {
    console.error("DELETE SPECIFIC TABLE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete table",
      error: err.message,
    });
  }
};

/* =====================================================
   🔴 DELETE NESTED FIELD - FIXED VERSION with pull()
===================================================== */

exports.deleteNestedField = async (req, res) => {
  try {
    const { id, tableType, tableId, fieldId } = req.params;

    console.log("DELETE NESTED FIELD - Params:", { id, tableType, tableId, fieldId });

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid SEBI record ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(tableId)) {
      return res.status(400).json({ success: false, message: "Invalid table ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(fieldId)) {
      return res.status(400).json({ success: false, message: "Invalid field ID" });
    }

    // Find the record
    const record = await SEBI.findById(id);
    if (!record) {
      return res.status(404).json({ success: false, message: "SEBI record not found" });
    }

    let deleted = false;
    let message = "";

    // Switch by tableType
    switch (tableType) {
      case "addressTables": {
        const table = record.addressTables.id(tableId);
        if (!table) return res.status(404).json({ success: false, message: "Address table not found" });

        const fieldIndex = table.fields?.findIndex(f => f._id.toString() === fieldId);
        if (fieldIndex === undefined || fieldIndex === -1) {
          return res.status(404).json({ success: false, message: "Field not found in address table" });
        }

        table.fields.splice(fieldIndex, 1);
        
        // If table is empty, remove the entire table using pull()
        if (table.fields.length === 0) {
          record.addressTables.pull(tableId);
          message = "Address table field deleted (table removed as it was empty)";
        } else {
          message = "Address table field deleted successfully";
        }
        deleted = true;
        break;
      }

      case "documentAll": {
        const doc = record.documentAll.id(tableId);
        if (!doc) return res.status(404).json({ success: false, message: "Document not found" });

        const fieldIndex = doc.documentfields?.findIndex(f => f._id.toString() === fieldId);
        if (fieldIndex === undefined || fieldIndex === -1) {
          return res.status(404).json({ success: false, message: "Document field not found" });
        }

        doc.documentfields.splice(fieldIndex, 1);
        
        // If document has no more fields, remove the entire document using pull()
        if (doc.documentfields.length === 0) {
          record.documentAll.pull(tableId);
          message = "Document field deleted (document removed as it was empty)";
        } else {
          message = "Document field deleted successfully";
        }
        deleted = true;
        break;
      }

      case "pdfTables": {
        const pdfTable = record.pdfTables.id(tableId);
        if (!pdfTable) return res.status(404).json({ success: false, message: "PDF table not found" });

        const fieldIndex = pdfTable.fields?.findIndex(f => f._id.toString() === fieldId);
        if (fieldIndex === undefined || fieldIndex === -1) {
          return res.status(404).json({ success: false, message: "PDF field not found" });
        }

        pdfTable.fields.splice(fieldIndex, 1);
        
        // If PDF table is empty, remove the entire table using pull()
        if (pdfTable.fields.length === 0) {
          record.pdfTables.pull(tableId);
          message = "PDF field deleted (table removed as it was empty)";
        } else {
          message = "PDF field deleted successfully";
        }
        deleted = true;
        break;
      }

      case "positionTable": {
        const posTable = record.positionTable.id(tableId);
        if (!posTable) return res.status(404).json({ success: false, message: "Position table not found" });

        const fieldIndex = posTable.fields?.findIndex(f => f._id.toString() === fieldId);
        if (fieldIndex === undefined || fieldIndex === -1) {
          return res.status(404).json({ success: false, message: "Position field not found" });
        }

        posTable.fields.splice(fieldIndex, 1);
        
        // If position table is empty, remove the entire table using pull()
        if (posTable.fields.length === 0) {
          record.positionTable.pull(tableId);
          message = "Position field deleted (table removed as it was empty)";
        } else {
          message = "Position field deleted successfully";
        }
        deleted = true;
        break;
      }

      default:
        return res.status(400).json({ success: false, message: "Invalid table type" });
    }

    if (!deleted) return res.status(404).json({ success: false, message: "Field not found" });

    // Save record
    record.updatedAt = Date.now();
    await record.save();

    console.log("✅ Field deleted successfully:", message);

    res.status(200).json({ success: true, message, data: record });
  } catch (err) {
    console.error("❌ DELETE NESTED FIELD ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to delete field", error: err.message });
  }
};

/* =====================================================
   🔴 DELETE SINGLE-LEVEL ITEM - FIXED VERSION
===================================================== */

exports.deleteSingleLevelItem = async (req, res) => {
  try {
    const { id, tableType, itemId } = req.params;

    console.log("DELETE SINGLE LEVEL ITEM - Params:", { id, tableType, itemId });

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI record ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    // Find the record
    const record = await SEBI.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    let deleted = false;
    let message = "";

    // Handle different table types
    switch (tableType) {
      case "documentLink": {
        const itemIndex = record.documentLink.findIndex(
          (item) => item._id.toString() === itemId
        );

        if (itemIndex === -1) {
          return res.status(404).json({
            success: false,
            message: "Document link not found",
          });
        }

        record.documentLink.splice(itemIndex, 1);
        message = "Document link deleted successfully";
        deleted = true;
        break;
      }

      case "documentPdf": {
        const itemIndex = record.documentPdf.findIndex(
          (item) => item._id.toString() === itemId
        );

        if (itemIndex === -1) {
          return res.status(404).json({
            success: false,
            message: "Document PDF not found",
          });
        }

        record.documentPdf.splice(itemIndex, 1);
        message = "Document PDF deleted successfully";
        deleted = true;
        break;
      }

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid table type for single-level deletion",
        });
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    record.updatedAt = Date.now();
    await record.save();

    console.log("✅ Item deleted successfully:", message);

    res.status(200).json({
      success: true,
      message: message,
      data: record,
    });
  } catch (err) {
    console.error("❌ DELETE SINGLE LEVEL ITEM ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: err.message,
    });
  }
};

exports.deleteSEBI = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "SEBI ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SEBI ID",
      });
    }

    // ✅ Find & Delete
    const deletedSEBI = await SEBI.findByIdAndDelete(id);

    if (!deletedSEBI) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SEBI record deleted successfully",
    });
  } catch (error) {
    console.error("Delete SEBI Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting SEBI",
    });
  }
};

module.exports = exports;