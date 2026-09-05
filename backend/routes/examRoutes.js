import express from "express";
import { createExam, getAllExams, getExamById } from "../controllers/examController.js";

const router = express.Router();

// Route: POST /api/exams - Create new exam with questions
router.post("/", createExam);

// Route: GET /api/exams - Get all exams
router.get("/", getAllExams);

// Route: GET /api/exams/:id - Get single exam by ID
router.get("/:id", getExamById);

export default router;