// routes/studentLifeRoutes.js
const express = require('express');
const router = express.Router();
const studentLifeController = require('../controllers/students/student-life');
const studentAffairsController = require('../controllers/students/student-affairs');

router.post('/student-life/create', studentLifeController.createStudentLife);

router.get('/student-life/', studentLifeController.getAllStudentLife);

router.get('/student-life/:id', studentLifeController.getStudentLifeById);

router.put('/student-life/:id', studentLifeController.updateStudentLife);

router.delete('/student-life/:id', studentLifeController.deleteStudentLife);

router.post('/student-affairs/create', studentAffairsController.createStudentAffairs);

router.get('/student-affairs/', studentAffairsController.getAllStudentAffairs);

router.get('/student-affairs/:id', studentAffairsController.getStudentAffairsById);

router.put('/student-affairs/:id', studentAffairsController.updateStudentAffairs);

router.delete('/student-affairs/:id', studentAffairsController.deleteStudentAffairs);


module.exports = router;