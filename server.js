import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import tiktokRouter from "./api/tiktok.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API
app.use("/api", tiktokRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
