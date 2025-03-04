import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email.includes("@") && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Contact <span className="text-indigo-600">EliteFit</span>
          </h1>
          <p className="mt-4 text-xl text-gray-700">
            We'd love to hear from you! Reach out to us anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "📧", title: "Email Us", info: "support@elitefit.com" },
            { icon: "📞", title: "Call Us", info: "+1 (123) 456-7890" },
            { icon: "📍", title: "Visit Us", info: "123 Fashion Ave, NY" },
          ].map(({ icon, title, info }, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg text-center transform transition hover:scale-105"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600">{info}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Send Us a Message
          </h2>
          <form
            className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["name", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Send Message
              </button>
              {submitted && (
                <p className="mt-3 text-green-600">
                  Message sent successfully!
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
