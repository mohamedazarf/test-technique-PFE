const express = require("express");
const cors = require("cors");
const course=require('./models/course');
const app = express();
const port = 5000;
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/Bridge").then(()=>console.log("connected"))
.catch(err=>console.log("failed to connect",err)).finally(()=>console.log("done"));
// Middleware
app.use(cors());

// Mock course data
const courses = [
  {

    title: "Spring Boot / Angular",
    price: "350 DT/ Month",
    img: "assets/images/9antra.png",
  },
  {

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




