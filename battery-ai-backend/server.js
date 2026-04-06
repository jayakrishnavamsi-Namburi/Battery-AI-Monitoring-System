import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

// DB
import connectDB from "./config/db.js";

// Routes
import batteryRoutes from "./routes/batteryRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import degradationRoutes from "./routes/degradationRoutes.js";

dotenv.config();

const app = express();

// 🔥 Create HTTP server (required for socket.io)
const server = http.createServer(app);

// ================= CORS =================

// 🔥 Allowed origins (update after frontend deploy)
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL // set this in Render later
];

// Express CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true
  })
);

// ================= SOCKET.IO =================

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ================= MIDDLEWARE =================

app.use(express.json());

// ================= DATABASE =================

connectDB();

// ================= ROUTES =================

// Battery data routes
app.use("/api/battery", batteryRoutes);

// Analysis routes
app.use("/api/analysis", analysisRoutes);

// Prediction routes
app.use("/api/predict", predictionRoutes);

// Degradation routes
app.use("/api/degradation", degradationRoutes);

// ================= ROOT =================

app.get("/", (req, res) => {
  res.send("🚀 Battery Monitoring API is running...");
});

// 🔥 Health check (important for Render)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// ================= SOCKET EVENTS =================

io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Make socket available in controllers
app.set("io", io);

// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});