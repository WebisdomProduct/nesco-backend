const express = require('express');
const router = express.Router();
const programController = require('../controllers/admission/programs');
const admissionProspectusController = require('../controllers/admission/prospectus');

router.post('/program/create', programController.createProgram);

router.get('/program/', programController.getAllPrograms);

router.get('/program/:id', programController.getProgramById);

router.put('/program/:id', programController.updateProgram);

router.delete('/program/:id', programController.deleteProgram);

router.post('/prospectus/create', admissionProspectusController.createAdmissionProspectus);

router.get('/prospectus/', admissionProspectusController.getAllAdmissionProspectuses);

router.get('/prospectus/:id', admissionProspectusController.getAdmissionProspectusById);

router.put('/prospectus/:id', admissionProspectusController.updateAdmissionProspectus);

router.delete('/prospectus/:id', admissionProspectusController.deleteAdmissionProspectus);

module.exports = router;
