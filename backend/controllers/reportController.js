import ViolationLog from "../models/mongo/ViolationLog.js"
import { calculateTrustscore } from "../utils/calculateTrustscore.js";

export const createViolation = async (req, res) => {
   try{
      const {studentId, examId, type, confidence} = req.body;

      if(!studentId || !examId || !type){
        return res.status(400).json({error: "studentId, examId, and type are required"});
      }
      const Violation = await ViolationLog.create({studentId, examId, type, confidence});
      res.status(201).json(Violation);
   }catch(error){
      res.status(500).json({error: error.message});
   }
};

export const getStudentViolations = async (req, res) => {
    try{
      const { examId, studentId } = req.params;
      const logs = await ViolationLog.find({examId, studentId}).sort({timestamp: -1});
      res.json(logs);
    }catch(error){
       res.status(500).json({error: error.message});
    }
};

export const getExamViolations = async (req, res) => {
    try{
     const {examId} = req.params;
     const logs = await ViolationLog.find({examId}).sort({timestamp: -1});
     res.json(logs);
    }catch(error){
     res.status(500).json({error: error.message});
    }
};

export const getTrustScore = async (req, res) => {
   try{
     const {examId, studentId} = req.params;
     const result = await calculateTrustscore(examId, studentId);
     res.json(result);
   }catch(error){
      res.status(500).json({error: error.message});
   }
};