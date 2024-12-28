const mongoose = require('mongoose');

// Define the schema for a course
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default:"assets/images/9antra.png",
  },
  description: {
    type: String,
    default: "", // Optional description field
  },
},{
  timestamps:true
}
);

// Create a model from the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
