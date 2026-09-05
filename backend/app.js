import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import mongoconnect from "./config/mongodb.js"
import examRoutes from "./routes/examRoutes.js";

import { connectPostgres } from "./config/postgre.js"
import reportRoutes from "./routes/reportRoutes.js"
import { syncSqlDatabase } from "./models/sql/index.js";
import authRoutes from "./routes/authRoutes.js";
import http from "http";
import { initSocket } from "./sockets/socketManager.js"


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);

app.get("/", (req, res) => {
    res.json({ message: "backend is working!" })
});
app.get("/api/test",(req, res)=>{
    res.json({message: "frontend-backend connected"})
})

app.use("/api/reports", reportRoutes)

const server = http.createServer(app);
initSocket(server);

const startServer = async () => {
    await mongoconnect();
    // 1. Connect to PostgreSQL
    await connectPostgres();
    // 2. Sync Tables
    await syncSqlDatabase();

    server.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });
}

startServer();