const express = require("express");
const router = express.Router();
const academicCouncilController = require("../controllers/about-us/academic-council");
const boardOfGovernorsController = require("../controllers/about-us/board-of-governers");
const boardOfManagementController = require("../controllers/about-us/board-of-managment");
const aboutDocumentsController = require("../controllers/about-us/documents");
const facultyController = require("../controllers/about-us/faculty");
const financeCommitteeController = require("../controllers/about-us/finance-committe");
const leadershipController = require("../controllers/about-us/leadership");
const nirfDocumentsController = require("../controllers/about-us/nirf");

router.post(
  "/academic-council/create",
  academicCouncilController.createCouncilMember
);

router.get(
  "/academic-council/",
  academicCouncilController.getAllCouncilMembers
);

router.get(
  "/academic-council/:id",
  academicCouncilController.getCouncilMemberById
);

router.put(
  "/academic-council/:id",
  academicCouncilController.updateCouncilMember
);

router.delete(
  "/academic-council/:id",
  academicCouncilController.deleteCouncilMember
);

router.post(
  "/board-of-governer/create",
  boardOfGovernorsController.createGovernor
);

router.get("/board-of-governer/", boardOfGovernorsController.getAllGovernors);

router.get(
  "/board-of-governer/:id",
  boardOfGovernorsController.getGovernorById
);

router.put("/board-of-governer/:id", boardOfGovernorsController.updateGovernor);

router.delete(
  "/board-of-governer/:id",
  boardOfGovernorsController.deleteGovernor
);

router.post(
  "/board-of-managment/create",
  boardOfManagementController.createManagementMember
);

router.get(
  "/board-of-managment/",
  boardOfManagementController.getAllManagementMembers
);

router.get(
  "/board-of-managment/:id",
  boardOfManagementController.getManagementMemberById
);

router.put(
  "/board-of-managment/:id",
  boardOfManagementController.updateManagementMember
);

router.delete(
  "/board-of-managment/:id",
  boardOfManagementController.deleteManagementMember
);

router.post("/about-documents/create", aboutDocumentsController.createDocument);

router.get("/about-documents/", aboutDocumentsController.getAllDocuments);

router.get("/about-documents/:id", aboutDocumentsController.getDocumentById);

router.put("/about-documents/:id", aboutDocumentsController.updateDocument);

router.delete("/about-documents/:id", aboutDocumentsController.deleteDocument);

router.post("/faculty/create", facultyController.createFacultyMember);

router.get("/faculty/", facultyController.getAllFacultyMembers);

router.get("/faculty/:id", facultyController.getFacultyMemberById);

router.put("/faculty/:id", facultyController.updateFacultyMember);

router.delete("/faculty/:id", facultyController.deleteFacultyMember);

router.post(
  "/finance-committee/create",
  financeCommitteeController.createFinanceCommitteeMember
);

router.get(
  "/finance-committee/",
  financeCommitteeController.getAllFinanceCommitteeMembers
);

router.get(
  "/finance-committee/:id",
  financeCommitteeController.getFinanceCommitteeMemberById
);

router.put(
  "/finance-committee/:id",
  financeCommitteeController.updateFinanceCommitteeMember
);

router.delete(
  "/finance-committee/:id",
  financeCommitteeController.deleteFinanceCommitteeMember
);

router.post("/leadership/create", leadershipController.createLeadership);

router.get("/leadership/", leadershipController.getAllLeaderships);

router.get("/leadership/:id", leadershipController.getLeadershipById);

router.put("/leadership/:id", leadershipController.updateLeadership);

router.delete("/leadership/:id", leadershipController.deleteLeadership);

router.post("/nirf/create", nirfDocumentsController.createNirfDocument);

router.get("/nirf/", nirfDocumentsController.getAllNirfDocuments);

router.get("/nirf/:id", nirfDocumentsController.getNirfDocumentById);

router.put("/nirf/:id", nirfDocumentsController.updateNirfDocument);

router.delete("/nirf/:id", nirfDocumentsController.deleteNirfDocument);

module.exports = router;
