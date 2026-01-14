const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  deleteMentor,
} = require('../controllers/Mentor/mentorController');

router.post(
  '/',
  upload.fields([
    { name: 'mentorImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
  ]),
  createMentor
);

router.get('/', getAllMentors);
router.get('/:id', getMentorById);

router.put(
  '/:id',
  upload.fields([
    { name: 'mentorImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
  ]),
  updateMentor
);

router.delete('/:id', deleteMentor);

module.exports = router;
