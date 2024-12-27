import React from "react";

function ContactUs() {
  return (
    <section className="bg-orange-400 p-8 rounded-lg max-w-xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Contact Us</h2>

      <form className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-white font-semibold">NAME</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-white text-gray-700"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-white font-semibold">EMAIL</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-white text-gray-700"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-white font-semibold">MESSAGE</label>
          <textarea
            placeholder="Write your message here"
            className="w-full p-3 rounded-lg bg-white text-gray-700"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-rose-600 text-white py-2 px-6 rounded-full mt-4"
          >
            Send the message
          </button>
        </div>
      </form>
    </section>
  );
}

export default ContactUs;
