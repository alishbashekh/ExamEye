import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected as test client:", socket.id);

    socket.emit("join-exam", {
        examId: "EXAM-8921",
        role: "teacher",
    });

    setTimeout(() => {
        socket.emit("violation", {
            studentId: "ST-101",
            examId: "EXAM-8921",
            type: "PHONE_DETECTED",
            confidence: 0.87,
        });
    }, 1000);
});

socket.on("new-violation", (data) => {
    console.log("Received violation broadcast:", data);
});

socket.on("violation-error", (err) => {
    console.log("Violation error:", err);
});

socket.on("disconnect", () => {
    console.log("Disconnected");
});