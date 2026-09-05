import { Exam, Question, User } from "../models/sql/index.js";

// Create a new Exam with Questions
export const createExam = async (req, res) => {
  try {
    const { title, description, durationMinutes, startTime, endTime, totalMarks, passingMarks, teacherId, questions } = req.body;

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