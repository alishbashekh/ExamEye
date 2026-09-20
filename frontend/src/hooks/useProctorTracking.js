import { useEffect, useRef, useCallback } from "react";
import axiosClient from "../api/axiosClient";

export const useProctorTracking = ({
  examId,
  studentId,
  isActive = true,
  onViolation,
}) => {
  const isReportingRef = useRef(false);

  const reportViolation = useCallback(
    async (type, confidence = 1.0) => {
      // Cooldown Guard: Prevents network spam within a 2-second window
      if (isReportingRef.current) return;
      isReportingRef.current = true;

      const timestamp = new Date().toISOString();

      try {
        // 1. Dispatch payload to Backend API
        const response = await axiosClient.post("/reports/violations", {
          studentId,
          examId,
          type,
          confidence,
          timestamp,
        });

        console.log(`[PROCTOR_ENGINE] Violation reported: ${type}`, response.data);

        // 2. Pass backend trustData to local React state
        if (typeof onViolation === "function") {
          onViolation(type, timestamp, response.data.trustData);
        }
      } catch (error) {
        console.error(
          `[PROCTOR_ENGINE] Telemetry sync failed:`,
          error.response?.data || error.message
        );

        // Fallback: Notify frontend even if backend call fails
        if (typeof onViolation === "function") {
          onViolation(type, timestamp, null);
        }
      } finally {
        setTimeout(() => {
          isReportingRef.current = false;
        }, 2000);
      }
    },
    [examId, studentId, onViolation]
  );

  useEffect(() => {
    if (!isActive) return;

    // 1. Tab Switch Detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        reportViolation("TAB_SWITCH");
      }
    };

    // 2. Window Focus Loss
    const handleWindowBlur = () => {
      if (!document.hidden) {
        reportViolation("TAB_SWITCH");
      }
    };

    // 3. Fullscreen Exit Detection
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        reportViolation("FULLSCREEN_EXIT");
      }
    };

    // 4. Copy & Paste Prevention & Detection
    const handleCopyPaste = (e) => {
      e.preventDefault();
    
      if (e.type === "copy") {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText.length > 0) {
          reportViolation("COPY_ATTEMPT");
        }
      } else if (e.type === "paste") {
        reportViolation("PASTE_ATTEMPT");
      }
    };

    // 5. DevTools Shortcut Detection
    const handleKeyDown = (e) => {
      const isF12 = e.key === "F12";
      const isInspectElement =
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c");
      const isViewSource = (e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u");

      if (isF12 || isInspectElement || isViewSource) {
        e.preventDefault();
        reportViolation("DEV_TOOLS_OPEN");
      }
    };

    // 6. DevTools Dimension Resize Detection
    const handleResize = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      if (widthThreshold || heightThreshold) {
        reportViolation("DEV_TOOLS_OPEN");
      }
    };

    // Attach Event Listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    // Lifecycle Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, reportViolation]);
};