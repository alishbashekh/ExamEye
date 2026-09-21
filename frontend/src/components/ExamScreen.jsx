import { useState } from "react";
import { useProctorTracking } from "../hooks/useProctorTracking";

export default function ExamScreen({ examId = "EXAM_101", studentId = "STU_8841" }) {
  const [examStarted, setExamStarted] = useState(false);
  const [violations, setViolations] = useState([]);
  
  // Dynamic session exam ID that refreshes on every test start
  const [activeExamId, setActiveExamId] = useState(examId);
  
  // State to hold live trust data from backend
  const [trustData, setTrustData] = useState({
    trustScore: 100,
    status: "SAFE",
    totalViolations: 0,
  });

  // Callback receives (type, timestamp, responseTrustData) from useProctorTracking hook
  const handleViolationDetected = (type, timestamp, responseTrustData) => {
    const violationEntry = {
      id: `${type}-${Date.now()}`,
      type,
      time: new Date(timestamp).toLocaleTimeString(),
    };
    
    setViolations((prev) => [violationEntry, ...prev]);

    // Update real-time Trust Score & Status state
    if (responseTrustData) {
      setTrustData(responseTrustData);

      // Auto-lock exam when disqualified
      if (responseTrustData.status === "DISQUALIFIED") {
        setExamStarted(false);
      }
    }
  };

  // Pass activeExamId so tracking hook always uses the current session ID
  useProctorTracking({
    examId: activeExamId,
    studentId,
    isActive: examStarted,
    onViolation: handleViolationDetected,
  });

  const startExamSession = () => {
    // Generate a brand new unique exam ID for this session
    const freshSessionId = `${examId}_${Date.now()}`;
    setActiveExamId(freshSessionId);

    // Reset local UI and trust states for a fresh start
    setViolations([]);
    setTrustData({
      trustScore: 100,
      status: "SAFE",
      totalViolations: 0,
    });

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    setExamStarted(true);
  };

  const isDisqualified = trustData.status === "DISQUALIFIED";

  return (
    <div style={{ padding: "30px", fontFamily: "system-ui, sans-serif", maxWidth: "720px", margin: "0 auto", position: "relative" }}>
      <h2>ExamEye Proctoring Engine</h2>

      {/* 🚨 1. DISQUALIFICATION OVERLAY MODAL */}
      {isDisqualified && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "#fff",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              border: "2px solid #ef4444",
              padding: "40px",
              borderRadius: "12px",
              maxWidth: "500px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h1 style={{ color: "#ef4444", fontSize: "48px", margin: "0 0 10px 0" }}>🚫</h1>
            <h2 style={{ color: "#f87171", margin: "0 0 12px 0" }}>Exam Disqualified</h2>
            <p style={{ color: "#cbd5e1", fontSize: "16px", lineHeight: "1.5" }}>
              Your session has been terminated due to excessive proctoring violations.
            </p>
            <div style={{ background: "#0f172a", padding: "12px", borderRadius: "8px", margin: "20px 0" }}>
              <p style={{ margin: "4px 0", color: "#94a3b8" }}>
                Final Trust Score: <strong style={{ color: "#ef4444" }}>{trustData.trustScore}%</strong>
              </p>
              <p style={{ margin: "4px 0", color: "#94a3b8" }}>
                Total Violations Logged: <strong style={{ color: "#f87171" }}>{trustData.totalViolations}</strong>
              </p>
            </div>
            <p style={{ fontSize: "12px", color: "#64748b" }}>
              This incident has been logged and sent to your exam administrator for review.
            </p>
          </div>
        </div>
      )}

      {/* EXAM CONTROLS & MONITORING */}
      {!examStarted ? (
        <button
          onClick={startExamSession}
          disabled={isDisqualified}
          style={{
            padding: "12px 24px",
            background: isDisqualified ? "#64748b" : "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: isDisqualified ? "not-allowed" : "pointer",
          }}
        >
          {isDisqualified ? "Session Terminated" : "Begin Exam (Fullscreen)"}
        </button>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ margin: 0 }}>Exam in Progress</h3>
              
              {/* LIVE TRUST SCORE BADGE */}
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  backgroundColor: trustData.trustScore >= 85 ? "#dcfce7" : trustData.trustScore >= 50 ? "#fef9c3" : "#fee2e2",
                  color: trustData.trustScore >= 85 ? "#15803d" : trustData.trustScore >= 50 ? "#a16207" : "#b91c1c",
                }}
              >
                Trust Score: {trustData.trustScore}% ({trustData.status})
              </span>
            </div>

            <p style={{ color: "#ef4444", fontWeight: "600", margin: 0 }}>
              ⚠️ Session Monitored: Do not exit full screen or leave this browser tab.
            </p>
            <button
              onClick={() => setExamStarted(false)}
              style={{ marginTop: "16px", padding: "8px 16px", cursor: "pointer" }}
            >
              Finish Exam
            </button>
          </div>

          {/* REAL-TIME TELEMETRY LOG */}
          <div style={{ background: "#0f172a", color: "#fff", padding: "20px", borderRadius: "8px" }}>
            <h4 style={{ margin: "0 0 12px 0" }}>Session Telemetry Log ({violations.length})</h4>
            {violations.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
                No violations recorded. Switch tabs or press Esc to test monitoring.
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {violations.map((v) => (
                  <li
                    key={v.id}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #334155",
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#f87171",
                      fontSize: "14px",
                    }}
                  >
                    <span>🚨 {v.type}</span>
                    <span style={{ color: "#94a3b8" }}>{v.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}