
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Feedback schema
const feedbackSchema = new mongoose.Schema({
  q1: { type: String, required: true },
  q2: { type: String, required: true },
  q3: { type: String, required: true },
  q4: { type: String, required: true },
  q5: { type: String, default: "" },
  submittedAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Home route
app.get("/", (req, res) => {
  res.send("Online Survey Application Backend is running!");
});

// Save feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully!"
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to save feedback",
      error: error.message
    });
  }
});

// Get feedback
app.get("/api/getfeedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch feedback",
      error: error.message
    });
  }
});

// Connect to MongoDB before starting server
mongoose
  .connect("mongodb://127.0.0.1:27017/surveyDB")
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
