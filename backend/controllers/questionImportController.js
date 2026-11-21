import XLSX from "xlsx";

const LETTERS = ["A", "B", "C", "D"];

// make headers case-insensitive and trim values
const normalizeRow = (row) => {
  const out = {};
  for (const [key, value] of Object.entries(row)) {
    out[String(key).trim().toLowerCase()] =
      typeof value === "string" ? value.trim() : value;
  }
  return out;
};

export const importQuestions = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });

    const questions = [];
    const errors = [];

    rows.forEach((rawRow, index) => {
      const rowNumber = index + 2; // row 1 is the header
      const row = normalizeRow(rawRow);

      const questionText = String(row.question || "").trim();
      const questionType = (row.type || "mcq").toString().toLowerCase();
      const correct = String(row.correct || "").trim();
      const marks = parseInt(row.marks, 10) || 1;

      if (!questionText) {
        return errors.push({ row: rowNumber, message: "Question text is missing" });
      }

      if (!["mcq", "true_false"].includes(questionType)) {
        return errors.push({ row: rowNumber, message: "Type must be mcq or true_false" });
      }

      // ---- True / False ----
      if (questionType === "true_false") {
        const answer = correct.toLowerCase();
        if (!["true", "false"].includes(answer)) {
          return errors.push({ row: rowNumber, message: "Correct answer must be True or False" });
        }
        return questions.push({
          questionText,
          questionType,
          options: ["True", "False"],
          correctAnswer: answer === "true" ? "True" : "False", // CORRECT ANSWER FORMAT
          marks,
        });
      }

      // ---- MCQ ----
      const rawOptions = LETTERS.map((l) => String(row[`option${l.toLowerCase()}`] || "").trim());
      const filledCount = rawOptions.filter(Boolean).length;

      if (filledCount < 2) {
        return errors.push({ row: rowNumber, message: "At least 2 options are required" });
      }

      const correctIndex = LETTERS.indexOf(correct.toUpperCase());
      if (correctIndex === -1 || !rawOptions[correctIndex]) {
        return errors.push({ row: rowNumber, message: "Correct answer must be A, B, C or D and point to a filled option" });
      }

      questions.push({
        questionText,
        questionType,
        options: rawOptions.filter(Boolean),
        correctAnswer: rawOptions[correctIndex], // CORRECT ANSWER FORMAT
        marks,
      });
    });

    // nothing is saved here: the teacher previews first
    res.status(200).json({ questions, errors });
  } catch (error) {
    res.status(500).json({ message: "Error reading file", error: error.message });
  }
};