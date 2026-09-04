
import ViolationLog from "../models/mongo/ViolationLog.js";

export const registerProctorHandlers = (io, socket) =>{

   socket.on("join-exam", (data) => {
    console.log("RAW DATA RECEIVED:", data, typeof data);
    const { examId, role, studentId } = data || {};
    socket.join(examId);
    console.log(`${role} joined exam room: ${examId}${studentId ? `(student:${studentId})` : ""}`);
});
    socket.on("violation", async (data)=>{
        try{
         const {studentId, examId, type, confidence} = data;

         if(!studentId || !examId || !type){
            socket.emit("violation-error", {error: "studentId, examId, and type are required"});
            return;
         }
         const violation = await ViolationLog.create({ studentId, examId, type, confidence});
         io.to(examId).emit("new-violation", violation);
        }catch(error){
            console.error("violation handling error:", error.message);
            socket.emit("violation-error", {error: error.message});
        }
    });
};