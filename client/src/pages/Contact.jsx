import React, { useState } from "react";
import Footer from "../components/Footer"; // Assuming you have a Footer component
import Navbar from "../components/Navbar"; // Fixed typo here

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out to us! We'll get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-lg rounded-lg p-10">

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact JobPortal</h2>
          <p className="mb-6 text-gray-600">
            Whether you're a job seeker looking for guidance, a recruiter seeking talent, or just have general inquiries — we're here to support you. Fill out the form below, and our team will respond shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info & Support Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-600">
               For technical issues, application help, or support queries, our dedicated team is here for you. 
              Please include your Job ID or Account Email for faster assistance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Head Office</h3>
            <p className="text-gray-600">
              JobPortal HQ<br />
             Gondal Rajkot <br />
              Gujarat, 360003, INDIA
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Support Contacts</h3>
            <p className="text-gray-600">
            Email: support@jobportal.com <br />
             Phone: +1 234 567 890 <br />
             Hours: Mon–Fri, 9AM to 6PM (EST)
            </p>
          </div>
        </div>
      </div> 
    </div>
    <Footer />
    </>
  );
};

export default Contact;
