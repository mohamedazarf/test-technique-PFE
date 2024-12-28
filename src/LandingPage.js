import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ContactUs from "./ContactUs";

function LandingPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // State to hold courses

  // Fetch courses from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses") // Replace with your backend API endpoint
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header className="header-content flex justify-between items-center text-white p-4">
        <img src="assets/images/the bridge logo.png" alt="Logo" className="logo h-12" />
        <button
          onClick={() => navigate("/admin")}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 shadow-lg transition-all"
        >
          Go to Admin Panel
        </button>
      </header>

      <section
  className="improvement  text-white py-20 text-center"
  style={{
    backgroundImage: `url('assets/images/background cover.png')`,  // Replace with the actual path to your image
  }}
>
<h1 className="text-xl font-bold bg-black text-white bg-opacity-50 inline-block px-4 py-2 rounded-md text-center">
  Improve your skills on your own
  <br />
  To prepare for a better future
  <br/>
  <button
    className="mt-6 bg-pink-700 text-white px-6 py-2 rounded-full hover:bg-pink-800 shadow-md transition-all"
  >
    REGISTER NOW
  </button>
</h1>

</section>


      {/* Courses Section */}
      <section className="courses py-10 bg-gray-100 text-center">
        <div className="flex justify-between items-center p-4">
          {/* Left Text */}
          <h2 className="text-2xl font-bold">Discover Our Courses</h2>

          {/* Right Button */}
          <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800">
            View More
          </button>
        </div>
        <div className="course-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 justify-items-center">
          {courses.map((course, index) => (
            <div key={index} className="course-item bg-white p-4 rounded-lg shadow-lg">
              <img
                src={course.img || "assets/images/9antra.png"} // Use default image if img is missing
                alt={course.title}
                className="rounded-t-lg w-full h-40 object-cover"
                onError={(e) => (e.target.src = "assets/images/9antra.png")} // Replace broken images
              />
              <h3 className="text-lg font-semibold mt-4">{course.title}</h3>
              <p className="text-pink-600 mt-2">{course.price}</p>
              {course.description && <p className="mt-2 text-gray-700">{course.description}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <ContactUs />
      </footer>
    </div>
  );
}

export default LandingPage;
