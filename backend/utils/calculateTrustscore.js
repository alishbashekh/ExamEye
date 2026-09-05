import ViolationLog from "../models/mongo/ViolationLog.js"

const VIOLATION_WEIGHTS = {
   PHONE_DETECTED: 15,
   MULTIPLE_FACES: 20,
   FACE_NOT_MATCHED: 25,
   NO_FACE_DETECTED: 10,
   TAB_SWITCH: 10,
   FULLSCREEN_EXIT: 12,
   COPY_PASTE_ATTEMPT: 8,
};
 
export const calculateTrustscore = async (examId, studentId)=>{
    const violations = await ViolationLog.find({ examId, studentId});

    let score = 100;

    violations.forEach((violation)=>{
        const weight = VIOLATION_WEIGHTS[violation.type] || 5;
        score -= weight;
    });

    score = Math.max(0,score);

    let status;
    if(score >= 85){
        status = "SAFE";
    }else if(score >= 50){
        status = "SUSPICIOUS";
    }else{
        status = "DISQUALIFIED";
    }
   
    return {
        studentId,
        examId,
        trustScore: score,
        status,
        totalViolations: violations.length,
        violationBreakdown: violations.reduce((acc, v)=>{
            acc[v.type] = (acc[v.type] || 0) + 1;
            return acc;
        }, {}),
    };
};