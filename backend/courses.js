// server.js or courses.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Course = require("./models/course");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// Connect to MongoDB
mongoose.connect("mongodb://localhost/Bridge")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Failed to connect", err));

// Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send("Error fetching courses");
  }
});

// Add a new course
app.post("/api/courses", async (req, res) => {
    try {
      // Create a new course object
      const courseData = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
      };
  
      // Only include the img field if it is provided
      if (req.body.img) {
        courseData.img = req.body.img;
      }
  
      const newCourse = new Course(courseData);
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
    } catch (err) {
      res.status(400).send("Error creating course");
    }
  });
  

// Update a course
app.put("/api/courses/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).send("Error updating course");
  }
});

// Delete a course
// app.delete("/api/courses/:id", async (req, res) => {
//   try {
//     await Course.findByIdAndDelete(req.params.id);
//     res.send("Course deleted");
//   } catch (err) {
//     res.status(400).send("Error deleting course");
//   }
// });
app.delete("/api/courses/:id", async (req, res) => {
  try {
    console.log("Delete request received for ID:", req.params.id); // Log incoming ID

    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).send("Course not found"); // Handle non-existent course
    }

    res.send("Course deleted successfully");
  } catch (err) {
    console.error("Error deleting course:", err); // Log errors
    res.status(500).send("Error deleting course");
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

