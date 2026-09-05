import express from "express";
import { createViolation , getStudentViolations , getExamViolations ,getTrustScore } from "../controllers/reportController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/violations" , authMiddleware, createViolation);
router.get("/violation/:examId/:studentId", authMiddleware, getStudentViolations);
router.get("/violation/:examId" , authMiddleware , roleMiddleware("teacher"), getExamViolations);
router.get("/trust-score/:examId/:studentId", authMiddleware , roleMiddleware("teacher"), getTrustScore);

export default router;