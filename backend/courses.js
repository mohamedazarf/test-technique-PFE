const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());

// Mock course data
const courses = [
  {
    id: 1,
    title: "Spring Boot / Angular",
    price: "350 DT/ Month",
    img: "assets/images/9antra.png",
  },
  {
    id: 2,
    title: "Node JS / React",
    price: "350 DT/ Month",
    img: "assets/images/9antra.png",
  },
];

// API endpoint to fetch courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


