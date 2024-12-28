import React, { useState,useEffect } from "react";
import axios from "axios";
function AdminPanel() {
  // State to manage courses
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Fetch courses from the backend
    axios
  .get("http://localhost:5000/api/courses")
  .then((response) => {
    const fetchedCourses = response.data.map((course) => ({
      ...course,
      img: course.img || "/assets/images/9antra.png", // Default image if none exists
    }));
    console.log(courses);
    setCourses(fetchedCourses);
  })
  .catch((error) => {
    console.error("Error fetching courses:", error);
  });

  }, []);

  // State for the new course form
  const [newCourse, setNewCourse] = useState({
    title: "",
    price: "",
    img: null,
  });

  // Handle input change for new course
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewCourse((prev) => ({
      ...prev,
      img: file ? URL.createObjectURL(file) : "/assets/images/9antra.png", // Use default image if no file is selected
    }));
  };
  

  // Add new course
  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        ...newCourse,
        img: newCourse.img || "/assets/images/9antra.png", // Fallback to default image
      },
    ]);
    setNewCourse({ title: "", price: "", img: null });
  };
  

  // Handle delete course
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  // Handle edit course
  const handleEditCourse = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    setNewCourse(courseToEdit);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>

      {/* Form to add a new course */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 ">
        <h2 className="text-2xl font-semibold mb-4">Create New Course</h2>
        <form>
          <input
            type="text"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            placeholder="Course Title"
            className="mb-4 p-3 w-full border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="price"
            value={newCourse.price}
            onChange={handleInputChange}
            placeholder="Course Price"
            className="mb-4 p-3 w-full border border-gray-300 rounded-md"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="mb-4 p-3 w-full border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={handleAddCourse}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Course
          </button>
        </form>
      </div>

      {/* List of courses */}
      <h2 className="text-2xl font-semibold mb-4">Course List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <li key={course.id} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={course.img}
            alt={course.title}
            className="w-full h-40 object-cover rounded-t-lg mb-4"
            onError={(e) => (e.target.src = "/assets/images/9antra.png")} // Replace broken images
          />

            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-pink-600">{course.price}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEditCourse(course.id)}
                className="bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
