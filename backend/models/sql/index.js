import { sequelize } from "../../config/postgre.js";
import User from "./User.js";

// Syncs JavaScript models directly with your PostgreSQL database
const syncSqlDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ PostgreSQL 'users' table synced successfully via Sequelize");
  } catch (error) {
    console.error("❌ Failed to sync PostgreSQL table:", error.message);
  }
};

export { User, syncSqlDatabase };