import express from "express";
import cors from "cors";
import { initializeDB } from "./db";
import routes from "./routes";
import { PORT } from "./config";

// Initialize Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));

// Initialize Database & Start Server
initializeDB().then((db) => {
  // Attach routes
  app.use("/api", routes(db));

  // Root route
  app.get("/", (req, res) => {
    res.json({ message: "✅ Backend is working!" });
  });

  // Start Server
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
