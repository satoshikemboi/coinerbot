import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

/* Load env */
dotenv.config();

/* Connect DB */
connectDB();

const app = express();

/* =======================
   CORS — MUST BE FIRST
======================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://remocoin.netlify.app"
  ],
  credentials: true
}));

/* Handle preflight */
app.options(/.*/, cors());

/* =======================
   Middlewares
======================= */
app.use(express.json());

/* =======================
   Routes
======================= */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/users", userRoutes);

/* =======================
   Server
======================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
