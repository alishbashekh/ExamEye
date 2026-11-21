import express from "express";
import { createExam, getAllExams, getExamById } from "../controllers/examController.js";
import upload from "../middlewares/upload.js";
import { importQuestions } from "../controllers/questionImportController.js";
const router = express.Router();

// Route: POST /api/exams - Create new exam with questions
router.post("/", createExam);

// Route: POST /api/exams/import-questions - Import questions from CSV or XLSX file
router.post("/import-questions", upload.single("file"), importQuestions);

// Route: GET /api/exams - Get all exams
router.get("/", getAllExams);

// Route: GET /api/exams/:id - Get single exam by ID
router.get("/:id", getExamById);

export default router;