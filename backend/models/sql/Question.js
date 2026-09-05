import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgre.js";

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questionType: {
      type: DataTypes.ENUM("mcq", "true_false"),
      defaultValue: "mcq",
      allowNull: false,
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING), // e.g., ["Option A", "Option B", "Option C", "Option D"]
      allowNull: true,
    },
    correctAnswer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    marks: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    tableName: "questions",
  }
);

export default Question;