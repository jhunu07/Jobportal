import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    };

    // Correct way to access Vite environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if variables are loaded (optional, but good for debugging)
    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are not set correctly.");
      setError("Configuration error: Email service is not set up.");
      setIsLoading(false);
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSuccess(true);
          setForm({ name: "", email: "", message: "" });
          setIsLoading(false);
        },
        (err) => {
          console.error("FAILED...", err);
          setError("Failed to send message. Please try again.");
          setIsLoading(false);
        }
      );
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
              Whether you're a job seeker or a recruiter, fill out the form below and we will respond shortly.
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
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
                {isSuccess && (
                  <p className="mt-2 text-green-600">Message sent successfully!</p>
                )}
                {error && (
                  <p className="mt-2 text-red-600">{error}</p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info & Support Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Need Help?</h3>
              <p className="text-gray-600">
                For technical issues, application help, or support queries, our dedicated team is here for you.
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