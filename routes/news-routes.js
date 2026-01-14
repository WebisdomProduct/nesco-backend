// routes/news.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer'); // Multer for handling multipart/form-data
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/news/newsController');

// Configure multer (memory storage for S3 upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ----------------- PUBLIC GET ROUTES -----------------
router.get('/', getAllNews);
router.get('/:id', getNewsById);

// ----------------- PROTECTED CRUD ROUTES -----------------
// For creating news with image upload
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), createNews);

// For updating news with optional image upload
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateNews);

// For deleting news
router.delete('/:id', deleteNews);

module.exports = router;
