import React from "react";
import ContactUs from "./ContactUs";
// import "./LandingPage.css"; 
function LandingPage() {
    const courses=[
        { name: "Spring Boot / Angular", price: "350 DT/ Month", img: "assets/images/9antra.png" },
        { name: "Node JS / React", price: "350 DT/ Month", img: "assets/images/9antra.png" },
        { name: "Flutter / Firebase", price: "350 DT/ Month", img: "assets/images/9antra.png" },
        { name: "Business Intelligence", price: "350 DT/ Month", img: "assets/images/9antra.png" },
        { name: "Artificial Intelligence", price: "350 DT/ Month", img: "assets/images/9antra.png" },
        { name: "Devops", price: "350 DT/ Month", img: "assets/images/9antra.png" },
      ]
  return (
    <div>
      {/* Header Section */}
      <header className="header-content">
<img src="assets/images/the bridge logo.png" alt="Logo" className="logo" />
      </header>

      {/* Courses Section */}
      <section className="courses py-10 bg-gray-100 text-center bg-red-500">
          <div className="flex justify-between items-center p-4">
      {/* Left Text */}
      <h2 className="text-2xl font-bold">Discover Our Courses</h2>

      {/* Right Button */}
      <button className="bg-purple-700 text-white px-6 py-2 rounded-full">
        View More
      </button>
           </div>
        <div className="course-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 justify-items-center">
          {courses.map((course, index) => (
            <div key={index} className="course-item bg-white p-4 rounded-lg shadow-lg">
              <img
                src={course.img}
                alt={course.name}
                className="rounded-t-lg w-full h-40 object-cover"
              />
              <h3 className="text-lg font-semibold mt-4">{course.name}</h3>
              <p className="text-pink-600 mt-2">{course.price}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Footer Section */}
      <footer>
        <ContactUs/>
      </footer>
    </div>
  );
}

export default LandingPage;
