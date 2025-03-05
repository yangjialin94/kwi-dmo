import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🚀 Backend is working with TypeScript!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
