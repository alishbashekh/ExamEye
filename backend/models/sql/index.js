import { sequelize } from "../../config/postgre.js";
import User from "./User.js";
import Exam from "./Exam.js";
import Question from "./Question.js";


// One Teacher (User) can create Many Exams
User.hasMany(Exam, { foreignKey: "teacherId", onDelete: "CASCADE" });
Exam.belongsTo(User, { foreignKey: "teacherId" });

// One Exam can have Many Questions
Exam.hasMany(Question, { foreignKey: "examId", onDelete: "CASCADE" });
Question.belongsTo(Exam, { foreignKey: "examId" });

// Syncs JavaScript models directly with your PostgreSQL database
const syncSqlDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ PostgreSQL 'users' table synced successfully via Sequelize");
  } catch (error) {
    console.error("❌ Failed to sync PostgreSQL table:", error.message);
  }
};

export {sequelize, User, Exam, Question, syncSqlDatabase };