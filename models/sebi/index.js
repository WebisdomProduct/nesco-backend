const mongoose = require("mongoose");

const documentPdfSchema = new mongoose.Schema({
  DocumentPdfName: String,
  documentPdfFile: String, // This will store the file path or URL
});

const documentLinkSchema = new mongoose.Schema({
  DocumentName: String,
  link: String,
});

const documentFieldSchema = new mongoose.Schema({
  documentDate: Date,
  documentName: String,
  documentFile: String, // File path or URL
});

const documentAllSchema = new mongoose.Schema({
  year: String,
  documentfields: [documentFieldSchema],
});

const pdfFieldSchema = new mongoose.Schema({
  pdfDate: String,
  pdfName: String,
  pdfFile: String,
  quater: String,
});

const pdfTableSchema = new mongoose.Schema({
  pdfYear: String,
  fields: [pdfFieldSchema],
});

const positionFieldSchema = new mongoose.Schema({
  name1: String,
  position: String,
});

const positionTableSchema = new mongoose.Schema({
  tablePositionTitle: String,
  fields: [positionFieldSchema],
});

const addressFieldDataSchema = new mongoose.Schema({
  name: String,
  position: String,
  email: String,
  full_address: String,
  phone: String,
  fax: String,
  cin: String,
  tel: String,
});

const addressFieldSchema = new mongoose.Schema({
  type: { type: String, enum: ["address", "position"] },
  data: addressFieldDataSchema,
});

const addressTableSchema = new mongoose.Schema({
  tableAddressTitle: String,
  fields: [addressFieldSchema],
});

const sebiSchema = new mongoose.Schema({
  title: String,
  date: Date,
  pdf_file: String, // File path or URL
  name: String,
  name1: String,
  link: String,
  nameDocument: String,
  nameDocument1: String,
  year: String,
  linkText: String,
  link1: String,
  documentPdf: [documentPdfSchema],
  documentLink: [documentLinkSchema],
  documentAll: [documentAllSchema],
  pdfTables: [pdfTableSchema],
  positionTable: [positionTableSchema],
  addressTables: [addressTableSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field before saving
sebiSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const SEBI = mongoose.model("SEBI", sebiSchema);

module.exports = SEBI;
