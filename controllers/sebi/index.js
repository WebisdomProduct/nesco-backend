const SEBI = require("../../models/sebi");

const processNestedDates = (data) => {
  // Process documentAlls dates
  if (data.documentAlls && Array.isArray(data.documentAlls)) {
    data.documentAlls.forEach((docAll) => {
      if (docAll.documentfields && Array.isArray(docAll.documentfields)) {
        docAll.documentfields.forEach((field) => {
          if (field.documentDate && typeof field.documentDate === "string") {
            field.documentDate = new Date(field.documentDate);
          }
        });
      }
    });
  }

  // Process pdfTables dates
  if (data.pdfTables && Array.isArray(data.pdfTables)) {
    data.pdfTables.forEach((table) => {
      // if (table.pdfDate && typeof table.pdfDate === "string") {
      //   table.pdfDate = new Date(table.pdfDate);
      // }
      if (table.fields && Array.isArray(table.fields)) {
        table.fields.forEach((field) => {
          if (field.pdfDate && typeof field.pdfDate === "string") {
            field.pdfDate = new Date(field.pdfDate);
          }
        });
      }
    });
  }
};

const cleanDataBasedOnType = (data) => {
  // Clean based on type and subValue
  if (data.type === "table") {
    // Remove all document-related fields if type is table
    delete data.documentLinks;
    delete data.documentPdfs;
    delete data.documentAlls;

    // Process based on subValue
    if (data.subValue === "addressTable") {
      delete data.positionTables;
      delete data.pdfTables;

      // Clean addressTables
      if (data.addressTables.length > 0 && Array.isArray(data.addressTables)) {
        data.addressTables = data.addressTables.filter(
          (table) =>
            table.tableAddressTitle ||
            (table.fields &&
              table.fields.some((field) =>
                field.type === "address"
                  ? Object.values(field.data).some((val) => val)
                  : Object.values(field.data).some((val) => val)
              ))
        );
      }
    } else if (data.subValue === "positionTable") {
      console.log(data);
      delete data.addressTables;
      delete data.pdfTables;

      // Clean positionTables
      if (data.positionTable.length > 0 && Array.isArray(data.positionTable)) {
        data.positionTable = data.positionTable.filter(
          (table) =>
            table.tablePositionTitle ||
            (table.fields &&
              table.fields.some((field) => field.name1 || field.position))
        );
      }
    } else if (data.subValue === "pdfTable") {
      delete data.addressTables;
      delete data.positionTables;

      // Clean pdfTables
      if (data.pdfTables && Array.isArray(data.pdfTables)) {
        data.pdfTables = data.pdfTables
          .filter((table) => {
            // Keep the table if it has any of these main fields
            const hasMainFields =
              table.pdfYear || table.pdfName || table.pdfFile;
            // Also check if any fields exist with valid data
            const hasValidFields =
              table.fields &&
              table.fields.some(
                (field) =>
                  field.pdfName ||
                  field.pdfFile ||
                  field.pdfDate ||
                  field.quater
              );

            return hasMainFields || hasValidFields;
          })
          .map((table) => {
            // Clean up fields array if it exists
            if (table.fields && Array.isArray(table.fields)) {
              table.fields = table.fields.filter(
                (field) =>
                  field.pdfName ||
                  field.pdfFile ||
                  field.pdfDate ||
                  field.quater
              );
            }
            return table;
          });
      }
    } else if (data.type === "document") {
      // Remove all table-related fields if type is document
      delete data.addressTables;
      delete data.positionTables;
      delete data.pdfTables;

      // Process based on subValue
      if (data.subValue === "documentLink") {
        delete data.documentPdfs;
        delete data.documentAlls;

        // Clean documentLinks
        if (
          data.documentLinks.length > 0 &&
          Array.isArray(data.documentLinks)
        ) {
          data.documentLinks = data.documentLinks.filter(
            (doc) => doc.DocumentName || doc.link
          );
        }
      } else if (data.subValue === "documentPdf") {
        delete data.documentLinks;
        delete data.documentAlls;

        // Clean documentPdfs
        if (data.documentPdfs.length > 0 && Array.isArray(data.documentPdfs)) {
          data.documentPdfs = data.documentPdfs.filter(
            (doc) => doc.DocumentPdfName || doc.documentPdfFile
          );
        }
      } else if (data.subValue === "documentAll") {
        delete data.documentLinks;
        delete data.documentPdfs;

        // Clean documentAlls
        if (data.documentAlls.length > 0 && Array.isArray(data.documentAlls)) {
          data.documentAlls = data.documentAlls.filter(
            (doc) =>
              doc.year ||
              (doc.documentfields &&
                doc.documentfields.some(
                  (field) =>
                    field.documentDate ||
                    field.documentName ||
                    field.documentFile
                ))
          );
        }
      }
    }
  }
  // Clean up empty fields
  // cleanEmptyFields(data);
};

const cleanEmptyFields = (obj) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    } else if (Array.isArray(obj[key]) && obj[key].length === 0) {
      delete obj[key];
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      cleanEmptyFields(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  }
};

const transformPdfTable = (pdfTables) => {
  if (!Array.isArray(pdfTables)) return [];

  return pdfTables.map((table) => ({
    pdfYear: table.pdfYear,
    fields: (table.fields || []).map((field) => ({
      pdfName: field.pdfName,
      pdfFile: field.pdfFile,
      quater: field.quater,
      pdfDate:
        field.pdfDate && typeof field.pdfDate === "string"
          ? new Date(field.pdfDate)
          : field.pdfDate,
      _id: field._id,
    })),
    _id: table._id,
  }));
};
// Helper function to transform positionTable
const transformPositionTable = (positionTable) => {
  if (Array.isArray(positionTable)) {
    return positionTable.map((table) => ({
      tablePositionTitle: table.tablePositionTitle,
      fields: table.fields.map((field) => ({
        name1: field.name1,
        position: field.position,
        _id: field._id, // Preserve existing _id or create new one
      })),
      _id: table._id, // Preserve existing _id or create new one
    }));
  }
  return [];
};

// Create a new SEBI record
exports.createSEBI = async (req, res) => {
  try {
    const data = req.body;

    // Transform positionTable field
    if (data.positionTable) {
      data.positionTable = transformPositionTable(data.positionTable);
    }

    // Set title from the first positionTable item if available
    if (data.pdfTables) {
      data.pdfTables = transformPdfTable(data.pdfTables);
    }

    // Convert date strings to Date objects if needed
    if (data.date && typeof data.date === "string") {
      data.date = new Date(data.date);
    }
    // Process any date fields in nested structures
    processNestedDates(data);

    // Clean data based on type and subValue
    cleanDataBasedOnType(data);
    // console.log(data);
    const sebi = new SEBI(data);
    await sebi.save();

    res.status(201).json({
      success: true,
      data: sebi,
      message: "SEBI record created successfully",
    });
  } catch (error) {
    console.error("Error creating SEBI record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create SEBI record",
      error: error.message,
    });
  }
};

// Fetch all SEBI records
exports.getSEBIRecords = async (req, res) => {
  try {
    const records = await SEBI.find();
    res.status(200).json({
      success: true,
      data: records,
      message: "SEBI records fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching SEBI records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch SEBI records",
      error: error.message,
    });
  }
};

// Fetch a SEBI record by ID
exports.getSEBIRecordById = async (req, res) => {
  try {
    const { id } = req.params;
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
      message: "SEBI record fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching SEBI record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch SEBI record",
      error: error.message,
    });
  }
};

// Update a SEBI record by ID
exports.updateSEBIRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Find the SEBI record by ID
    const record = await SEBI.findById(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    // Transform positionTable field
    if (data.positionTable && Array.isArray(data.positionTable)) {
      record.positionTable = transformPositionTable(data.positionTable);
      if (data.positionTable?.[0]?.title) {
        record.title = data.positionTable[0].title;
      }
    }

    // Update title from the first positionTable item if available

    // Update other fields if provided
    if (data.documentAll && Array.isArray(data.documentAll)) {
      // Transform the incoming data to match the desired structure
      record.documentAll = data.documentAll.map((item) => ({
        year: item.year,
        documentfields: item.documentfields,
        _id: item._id || new mongoose.Types.ObjectId(), // Preserve existing _id or create new one
      }));

      // Update title if it exists in the first documentAll item
      if (data.documentAll[0]?.title) {
        record.title = data.documentAll[0].title;
      }
    }
    // Update documentPdf if it exists and is an array

    if (data.documentPdf && Array.isArray(data.documentPdf)) {
      record.documentPdf = data.documentPdf.map((item) => ({
        DocumentPdfName: item.DocumentPdfName,
        documentPdfFile: item.documentPdfFile,
        _id: item._id || new mongoose.Types.ObjectId(),
      }));
      if (data.documentPdf[0]?.title) {
        record.title = data.documentPdf[0].title;
      }
    }

    // Update pdfTables if it exists and is an array
    if (data.pdfTables && Array.isArray(data.pdfTables)) {
      record.pdfTables = data.pdfTables.map((table) => ({
        pdfYear: table.pdfYear,
        fields: table.fields.map((field) => ({
          pdfName: field.pdfName,
          pdfFile: field.pdfFile,
          quater: field.quater,
          pdfDate: field.pdfDate && new Date(field.pdfDate),
          _id: field._id,
        })),
        _id: table._id,
      }));
      if (data.pdfTables[0]?.title) {
        record.title = data.pdfTables[0].title;
      }
    }
    if (data.addressTables) record.addressTables = data.addressTables;
    // Save the updated record
    const updatedRecord = await record.save();

    res.status(200).json({
      success: true,
      data: updatedRecord,
      message: "SEBI record updated successfully",
    });
  } catch (error) {
    console.error("Error updating SEBI record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update SEBI record",
      error: error.message,
    });
  }
};

// Delete a SEBI record by ID
exports.deleteSEBIRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await SEBI.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "SEBI record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedRecord,
      message: "SEBI record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting SEBI record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete SEBI record",
      error: error.message,
    });
  }
};
