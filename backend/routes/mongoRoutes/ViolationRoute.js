import express from "express"
import ViolationLog from "../../models/mongo/ViolationLog.js"

const router = express.Router();

router.post("/", async (req, res)=>{
    try{
     const { studentId, examId, type, confidence} = req.body;
     const violation = await ViolationLog.create({
        studentId,
        examId,
        type,
        confidence,
     });
     res.status(201).json(violation);
    }catch(error){
      res.status(500).json({error: error.message});
    }
});
router.get("/:examId/:studentId", async (req, res)=>{
    try{
      const { examId, studentId } = req.params;
      const logs = await ViolationLog.find({examId, studentId});
      res.json(logs);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

export default router;