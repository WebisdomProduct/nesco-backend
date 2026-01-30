const mongoose = require("mongoose");
const SEBI = require("../../models/sebi");

/* =====================================================
   🔹 HELPERS
===================================================== */

const normalizeYear = (year) => String(year).trim();

/* Convert string dates into JS Date */
const processNestedDates = (data) => {
  if (Array.isArray(data.pdfTables)) {
    data.pdfTables.forEach((table) => {
      table.fields?.forEach((field) => {
        if (typeof field.pdfDate === "string") {
          field.pdfDate = new Date(field.pdfDate);
        }
      });
    });
  }

  if (Array.isArray(data.documentAlls)) {
    data.documentAlls.forEach((doc) => {
      doc.documentfields?.forEach((field) => {
        if (typeof field.documentDate === "string") {
          field.documentDate = new Date(field.documentDate);
        }
      });
    });
  }
};

/* Rebuild position table */
const transformPositionTable = (tables = []) =>
  tables.map((table) => ({
    tablePositionTitle: table.tablePositionTitle,
    fields: table.fields.map((field) => ({
      name1: field.name1,
      position: field.position,
      _id: field._id || new mongoose.Types.ObjectId(),
    })),
    _id: table._id || new mongoose.Types.ObjectId(),
  }));

/* =====================================================
   🟢 CREATE / APPEND SEBI
===================================================== */

exports.createSEBI = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title) {
      return res
        .status(400)
        .json({ success: false, message: "Title required" });
    }

    processNestedDates(data);

    let sebi = await SEBI.findOne({ title: data.title });

    /* ================= CREATE NEW ================= */

    if (!sebi) {
      const newSEBI = new SEBI(data);
      await newSEBI.save();

      return res.status(201).json({
        success: true,
        message: "SEBI created",
        data: newSEBI,
      });
    }

    /* ================= PDF TABLE (YEAR SAFE APPEND) ================= */

    if (Array.isArray(data.pdfTables)) {
      data.pdfTables.forEach((incoming) => {
        const incomingYear = normalizeYear(incoming.pdfYear);

        const existing = sebi.pdfTables.find(
          (t) => normalizeYear(t.pdfYear) === incomingYear
        );

        if (existing) {
          incoming.fields?.forEach((field) => {
            const duplicate = existing.fields.some(
              (f) =>
                f.quater === field.quater &&
                f.pdfName === field.pdfName
            );

            if (!duplicate) {
              existing.fields.push({
                pdfName: field.pdfName,
                pdfFile: field.pdfFile,
                quater: field.quater,
                pdfDate: field.pdfDate || null,
                _id: field._id || new mongoose.Types.ObjectId(),
              });
            }
          });
        } else {
          sebi.pdfTables.push({
            pdfYear: incomingYear,
            fields: incoming.fields || [],
            _id: new mongoose.Types.ObjectId(),
          });
        }
      });
    }

    /* ================= ADDRESS TABLE ================= */

    if (Array.isArray(data.addressTables)) {
      data.addressTables.forEach((incoming) => {
        if (!incoming.tableAddressTitle) return;

        const existing = sebi.addressTables.find(
          (a) => a.tableAddressTitle === incoming.tableAddressTitle
        );

        if (existing) {
          existing.fields.push(...(incoming.fields || []));
        } else {
          sebi.addressTables.push({
            tableAddressTitle: incoming.tableAddressTitle,
            fields: incoming.fields || [],
            _id: new mongoose.Types.ObjectId(),
          });
        }
      });
    }

    /* ================= POSITION TABLE (REPLACE) ================= */

    if (Array.isArray(data.positionTable)) {
      sebi.positionTable = transformPositionTable(data.positionTable);
    }

    /* ================= DOCUMENT ALL (YEAR SAFE APPEND) ================= */

    if (Array.isArray(data.documentAlls)) {
      data.documentAlls.forEach((incoming) => {
        const incomingYear = normalizeYear(incoming.year);

        const existing = sebi.documentAlls.find(
          (d) => normalizeYear(d.year) === incomingYear
        );

        if (existing) {
          existing.documentfields.push(...incoming.documentfields);
        } else {
          sebi.documentAlls.push({
            ...incoming,
            year: incomingYear,
          });
        }
      });
    }

    await sebi.save();

    res.status(200).json({
      success: true,
      message: "SEBI updated successfully (no duplicate years)",
      data: sebi,
    });
  } catch (err) {
    console.error("CREATE SEBI ERROR:", err);
    res.status(500).json({
      success: false,
      message: "SEBI create/update failed",
      error: err.message,
    });
  }
};

/* =====================================================
   🔵 GET ALL
===================================================== */

exports.getSEBIRecords = async (req, res) => {
  try {
    const records = await SEBI.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* =====================================================
   🔵 GET BY ID
===================================================== */

exports.getSEBIRecordById = async (req, res) => {
  try {
    const record = await SEBI.findById(req.params.id);

    if (!record)
      return res
        .status(404)
        .json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* =====================================================
   🟠 UPDATE (EXPLICIT)
===================================================== */

exports.updateSEBIRecord = async (req, res) => {
  try {
    const record = await SEBI.findById(req.params.id);

    if (!record)
      return res
        .status(404)
        .json({ success: false, message: "Not found" });

    Object.assign(record, req.body);
    record.updatedAt = Date.now();

    await record.save();

    res.status(200).json({
      success: true,
      message: "SEBI updated explicitly",
      data: record,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* =====================================================
   🔴 DELETE
===================================================== */

exports.deleteSEBIRecord = async (req, res) => {
  try {
    const deleted = await SEBI.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Not found" });

    res.status(200).json({
      success: true,
      message: "SEBI deleted",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
