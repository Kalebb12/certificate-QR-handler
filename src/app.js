import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import certificateRouter from "./routes/certificate.routes.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL], // client url for dev
    credentials: true,               // allow cookies
  })
);

app.use(express.json());

app.use("/api/certificate",certificateRouter)

export default app