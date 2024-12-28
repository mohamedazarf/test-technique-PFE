// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const Course = require("./models/course");

// const app = express();
// const port = 5000;

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost/Bridge", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.log("Failed to connect", err));

// // Middleware
// app.use(cors());
// app.use(bodyParser.json()); // To parse JSON request bodies

// // Create (POST): Add a new course
// app.post("/api/courses", async (req, res) => {
//   try {
//     const { title, price, img } = req.body;
//     const newCourse = new Course({ title, price, img });
//     const savedCourse = await newCourse.save();
//     res.status(201).json(savedCourse); // Return the saved course
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create the course" });
//   }
// });

// // Read (GET): Fetch all courses
// app.get("/api/courses", async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses); // Return all courses
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch courses" });
//   }
// });

// // Update (PUT): Update a course by ID
// app.put("/api/courses/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, price, img } = req.body;
//     const updatedCourse = await Course.findByIdAndUpdate(
//       id,
//       { title, price, img },
//       { new: true } // Return the updated course
//     );
//     if (!updatedCourse) {
//       return res.status(404).json({ error: "Course not found" });
//     }
//     res.json(updatedCourse);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update the course" });
//   }
// });

// // Delete (DELETE): Remove a course by ID
// app.delete("/api/courses/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedCourse = await Course.findByIdAndDelete(id);
//     if (!deletedCourse) {
//       return res.status(404).json({ error: "Course not found" });
//     }
//     res.json({ message: "Course deleted successfully", course: deletedCourse });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete the course" });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// server.js or courses.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Course = require("./models/course");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

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
app.delete("/api/courses/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.send("Course deleted");
  } catch (err) {
    res.status(400).send("Error deleting course");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

