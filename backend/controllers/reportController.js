import ViolationLog from "../models/mongo/ViolationLog.js";
import { calculateTrustscore } from "../utils/calculateTrustscore.js";

export const createViolation = async (req, res) => {
  try {
    const { studentId, examId, type, confidence } = req.body;

    if (!studentId || !examId || !type) {
      return res.status(400).json({ error: "studentId, examId, and type are required" });
    }

    // 1. Save the raw log entry in MongoDB
    const violation = await ViolationLog.create({ studentId, examId, type, confidence });

    // 2. Calculate the updated trust score in real-time
    const trustData = await calculateTrustscore(examId, studentId);

    // 3. Return both the trustData object AND the saved violation document
    return res.status(201).json({
      success: true,
      message: `Violation recorded: ${type}`,
      trustData,
      violation,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getStudentViolations = async (req, res) => {
  try {
    const { examId, studentId } = req.params;
    const logs = await ViolationLog.find({ examId, studentId }).sort({ timestamp: -1 });
    return res.json(logs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getExamViolations = async (req, res) => {
  try {
    const { examId } = req.params;
    const logs = await ViolationLog.find({ examId }).sort({ timestamp: -1 });
    return res.json(logs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTrustScore = async (req, res) => {
  try {
    const { examId, studentId } = req.params;
    const result = await calculateTrustscore(examId, studentId);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};