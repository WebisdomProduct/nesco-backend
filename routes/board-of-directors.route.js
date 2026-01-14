const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createDirector,
  updateDirector,
  getDirectors,
  deleteDirector,
} = require('../controllers/boardOfDirectors/board-of-directors-controller');

// Multer (memory storage for S3)
const upload = multer({ storage: multer.memoryStorage() });

// PUBLIC → GET (no login)
router.get('/', getDirectors);

// ADMIN → CREATE
router.post(
  '/',
  upload.fields([{ name: 'directorImage', maxCount: 1 }]),
  createDirector
);

// ADMIN → UPDATE
router.put(
  '/:id',
  upload.fields([{ name: 'directorImage', maxCount: 1 }]),
  updateDirector
);

// ADMIN → DELETE
router.delete('/:id', deleteDirector);

module.exports = router;
