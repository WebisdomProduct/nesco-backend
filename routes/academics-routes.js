const express = require("express");
const router = express.Router();
const schoolOfDSUController = require("../controllers/academics/school-of-dsu");
const academicCalendarController = require("../controllers/academics/academic-calender");
const syllabusController = require("../controllers/academics/syllabus");
const notificationController = require("../controllers/academics/notifications");
const resultController = require("../controllers/academics/results");
const circularController = require("../controllers/academics/circulars");
const rulesAndRegulationsController = require("../controllers/academics/rules-and-regulations");
const approvalController = require("../controllers/academics/approvals");

router.post("/school-of-dsu/create", schoolOfDSUController.createSchool);

router.get("/school-of-dsu/", schoolOfDSUController.getAllSchools);

router.get("/school-of-dsu/:id", schoolOfDSUController.getSchoolById);

router.put("/school-of-dsu/:id", schoolOfDSUController.updateSchool);

router.delete("/school-of-dsu/:id", schoolOfDSUController.deleteSchool);

router.post(
  "/academic-calender/create",
  academicCalendarController.createAcademicCalendar
);

router.get(
  "/academic-calender/",
  academicCalendarController.getAllAcademicCalendars
);

router.get(
  "/academic-calender/:id",
  academicCalendarController.getAcademicCalendarById
);

router.put(
  "/academic-calender/:id",
  academicCalendarController.updateAcademicCalendar
);

router.delete(
  "/academic-calender/:id",
  academicCalendarController.deleteAcademicCalendar
);

router.post("/syllabus/create", syllabusController.createSyllabus);

router.get("/syllabus/", syllabusController.getAllSyllabus);

router.get("/syllabus/:id", syllabusController.getSyllabusById);

router.put("/syllabus/:id", syllabusController.updateSyllabus);

router.delete("/syllabus/:id", syllabusController.deleteSyllabus);

router.post("/notifications/create", notificationController.createNotification);

router.get("/notifications/", notificationController.getAllNotifications);

router.get("/notifications/:id", notificationController.getNotificationById);

router.put("/notifications/:id", notificationController.updateNotification);

router.delete("/notifications/:id", notificationController.deleteNotification);

router.post("/results/create", resultController.createResult);

router.get("/results/", resultController.getAllResults);

router.get("/results/:id", resultController.getResultById);

router.put("/results/:id", resultController.updateResult);

router.delete("/results/:id", resultController.deleteResult);

router.post("/circulars/create", circularController.createCircular);

router.get("/circulars/", circularController.getAllCirculars);

router.get("/circulars/:id", circularController.getCircularById);

router.put("/circulars/:id", circularController.updateCircular);

router.delete("/circulars/:id", circularController.deleteCircular);

router.post(
  "/rules/create",
  rulesAndRegulationsController.createRulesAndRegulations
);

router.get("/rules/", rulesAndRegulationsController.getAllRulesAndRegulations);

router.get(
  "/rules/:id",
  rulesAndRegulationsController.getRulesAndRegulationsById
);

router.put(
  "/rules/:id",
  rulesAndRegulationsController.updateRulesAndRegulations
);

router.delete(
  "/rules/:id",
  rulesAndRegulationsController.deleteRulesAndRegulations
);

router.post("/approvals/create", approvalController.createApproval);

router.get("/approvals/", approvalController.getAllApprovals);

router.get("/approvals/:id", approvalController.getApprovalById);

router.put("/approvals/:id", approvalController.updateApproval);

router.delete("/approvals/:id", approvalController.deleteApproval);

module.exports = router;
