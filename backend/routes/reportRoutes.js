import express from "express";
import { createViolation , getStudentViolations , getExamViolations ,getTrustScore } from "../controllers/reportController.js";

const router = express.Router();

router.post("/violations" , createViolation);
router.get("/violation/:examId/:studentId", getStudentViolations);
router.get("/violation/:examId" , getExamViolations);
router.get("/trust-score/:examId/:studentId", getTrustScore);

export default router;