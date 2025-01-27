import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    price: "",
    img: null,
    description: "",
  });

  // Fetch courses from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Handle input change
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse((prev) => ({
          ...prev,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add course
  const handleAddCourse = () => {
    axios
      .post("http://localhost:5000/api/courses", newCourse)
      .then((response) => {
        setCourses([...courses, response.data]);
        setNewCourse({ title: "", price: "", img: null, description: "" });
      })
      .catch((error) => console.error("Error adding course:", error));
  };

  // Edit course
  const handleEditCourse = (id) => {
    const courseToEdit = courses.find((course) => course._id === id); // Use `_id`
    if (courseToEdit) {
      setNewCourse({
        title: courseToEdit.title || "",
        price: courseToEdit.price || "",
        img: courseToEdit.img || "",
        description: courseToEdit.description || "",
        _id: courseToEdit._id, // Set `_id` to switch to edit mode
      });
    } else {
      console.error("Course not found for editing");
    }
  };
  
  // Update course
  const handleUpdateCourse = () => {
    axios
      .put(`http://localhost:5000/api/courses/${newCourse._id}`, newCourse)
      .then((response) => {
        setCourses(
          courses.map((course) =>
            course._id === newCourse._id ? response.data : course
          )
        );
        setNewCourse({ title: "", price: "", img: null, description: "" });
      })
      .catch((error) => console.error("Error updating course:", error));
  };

  // Delete course
  const handleDeleteCourse = (id) => {
    axios
      .delete(`http://localhost:5000/api/courses/${id}`)
      .then(() => setCourses(courses.filter((course) => course._id !== id)))
      .catch((error) => console.error("Error deleting course:", error));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {newCourse._id ? "Edit Course" : "Create New Course"}
        </h2>
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
          <textarea
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            placeholder="Course Description (Optional)"
            className="mb-4 p-3 w-full border border-gray-300 rounded-md"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="mb-4 p-3 w-full border border-gray-300 rounded-md"
          />
         <button
            type="button"
            onClick={newCourse._id ? handleUpdateCourse : handleAddCourse}
            className={`${
              newCourse._id ? "bg-yellow-500" : "bg-blue-500"
            } text-white py-2 px-4 rounded-lg hover:bg-blue-600`}
          >
  {newCourse._id ? "Update Course" : "Add Course"}
</button>

        </form>
      </div>

      {/* Course List */}
      <h2 className="text-2xl font-semibold mb-4">Course List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {courses.map((course) => (
    <li
      key={course._id} // Use `_id` here
      className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
      style={{ minHeight: "300px" }} // Ensure all cards have a consistent height
    >
      <div>
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-40 object-cover rounded-t-lg mb-4"
          onError={(e) => (e.target.src = "assets/images/9antra.png")}
        />
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-pink-600">{course.price}</p>
        {course.description && (
          <p className="text-gray-600 mt-2">{course.description}</p>
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => handleEditCourse(course._id)} // Use `_id` here
          className="bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteCourse(course._id)} // Use `_id` here
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
