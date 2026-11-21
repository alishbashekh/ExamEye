import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgre.js";

const Exam = sequelize.define(
  "Exam",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    passingMarks: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
     code: {
      type: DataTypes.STRING(6),
      allowNull: true, // old exams have no code
    },
    sensitivity: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Medium",
    },
  },
  {
    timestamps: true,
    tableName: "exams",
    indexes: [{ unique: true, fields: ["code"], name: "exams_code_unique" }],
  }
);

export default Exam;