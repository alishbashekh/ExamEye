import { Exam, Question, User } from "../models/sql/index.js";
import crypto from "crypto";


const generateUniqueCode = async () => {
  for (let i = 0; i < 10; i++) {
    const code = String(crypto.randomInt(100000, 1000000)); // 6 digits
    const exists = await Exam.findOne({ where: { code } });
    if (!exists) return code;
  }
  throw new Error("Could not generate a unique exam code");
};


// Create a new Exam with Questions
export const createExam = async (req, res) => {
  try {
    const { title, description, durationMinutes, startTime, endTime, sensitivity, totalMarks, passingMarks, teacherId, questions } = req.body;

    // 1. Create the Exam entry
    const newExam = await Exam.create({
  title,
  description,
  durationMinutes,
  startTime,
  endTime,
  totalMarks: totalMarks || 100,
  passingMarks: passingMarks || 50,
  teacherId,
  sensitivity: ["Low", "Medium", "High"].includes(sensitivity) ? sensitivity : "Medium",
  code: await generateUniqueCode(),
});

    // 2. If questions were provided, attach them to this exam
    if (questions && questions.length > 0) {
      const formattedQuestions = questions.map((q) => ({
        ...q,
        examId: newExam.id,
      }));
      await Question.bulkCreate(formattedQuestions);
    }

    // 3. Fetch the complete exam including its questions
    const createdExam = await Exam.findByPk(newExam.id, {
      include: [{ model: Question }],
    });

    res.status(201).json({
      message: "Exam created successfully",
      exam: createdExam,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating exam", error: error.message });
  }
};

// Get all Exams (for Students/Teachers to view available tests)
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: [
        { model: Question },
        { model: User, attributes: ["id", "name", "email"] }, // Include teacher details
      ],
    });
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error: error.message });
  }
};

// Get a single Exam by ID with its Questions
export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByPk(id, {
      include: [{ model: Question }],
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam details", error: error.message });
  }
};


// Students use this: finds an exam by its 6-digit code, WITHOUT correct answers
export const getExamByCode = async (req, res) => {
  try {
    const code = String(req.params.code).replace(/\D/g, ""); // "123-456" works too
    if (code.length !== 6) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const exam = await Exam.findOne({
      where: { code },
      attributes: { exclude: ["teacherId"] },
      include: [{ model: Question, attributes: { exclude: ["correctAnswer"] } }],
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const now = new Date();
    if (now < exam.startTime) {
      return res.status(403).json({ message: "This exam has not started yet" });
    }
    if (now > exam.endTime) {
      return res.status(403).json({ message: "This exam has ended" });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam", error: error.message });
  }
};