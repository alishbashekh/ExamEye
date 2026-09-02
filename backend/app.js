import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import mongoconnect from "./config/mongodb.js"
import { connectPostgres } from "./config/postgre.js"

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "backend is working!" })
});
app.get("/api/test",(req, res)=>{
    res.json({message: "frontend-backend connected"})
})

const startServer = async () => {
    await mongoconnect();
    await connectPostgres();

    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });
}

startServer();