// server.js
const express = require("express");
const path = require("path");
const app = express();
const authRouter = require("./routers/auth.router");
const taskRouter = require("./routers/tasks.router");
const profileRouter = require("./routers/profile.router");
const connectMongo = require("./services/mongo");
const cors = require("cors");
require("dotenv").config();

const PORT = 5000;

app.use(express.json());
app.use(cors());

connectMongo();

// API routes
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/profile", profileRouter);

// Serve frontend only in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`✅ server running on http://localhost:${PORT}`);
});
