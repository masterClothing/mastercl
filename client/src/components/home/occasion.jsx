import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import images
import photooccasion1 from "../../assets/Images/winter.jpg";
import photooccasion2 from "../../assets/Images/summer.jpg";
import photooccasion3 from "../../assets/Images/formal.jpg";
import photooccasion4 from "../../assets/Images/sport.jpg";

const occasions = [
  {
    name: "Winter",
    image: photooccasion1,
    description: "Stay warm and stylish with our winter collection",
    tagline: "Cozy & Elegant",
  },
  {
    name: "Summer",
    image: photooccasion2,
    description: "Light, breathable fabrics for the hottest days",
    tagline: "Cool & Fresh",
  },
  {
    name: "Formal",
    image: photooccasion3,
    description: "Make a statement at your next formal event",
    tagline: "Sophisticated & Refined",
  },
  {
    name: "Sport",
    image: photooccasion4,
    description: "Performance wear for your active lifestyle",
    tagline: "Dynamic & Functional",
  },
];

const Occasion = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleOccasionClick = (occasionName) => {
    navigate(`/occasion/${occasionName.toLowerCase()}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider">
            Curated Collections
          </span>
          <h2 className="mt-3 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
            Shop by Occasion
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover perfectly curated outfits for every moment and season in
            your life
          </p>
          <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
        </div>

        {/* Occasion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {occasions.map((occasion, index) => (
            <div
              key={index}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleOccasionClick(occasion.name)}
            >
              {/* Card Background */}
              <div className="absolute inset-0">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  src={occasion.image}
                  alt={occasion.name}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-gray-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                {occasion.tagline}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start transition-transform duration-300 ease-in-out">
                {/* Title with animated underline */}
                <h3 className="text-2xl font-bold text-white mb-2 relative">
                  {occasion.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </h3>

                {/* Description with reveal animation */}
                <p className="text-white/90 mb-4 transform transition-all duration-300 ease-in-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  {occasion.description}
                </p>

                {/* Button */}
                <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium transform transition-all duration-300 ease-in-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-gray-50 flex items-center">
                  Explore Collection
                  <svg
                    className="ml-2 w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Pulsing Indicator */}
              {hoveredIndex === index && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                  <div className="h-24 w-24 rounded-full border-2 border-white opacity-0 animate-ping"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Featured Seasonal Banner */}
        <div className="mt-16 relative overflow-hidden rounded-2xl shadow-2xl">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 md:p-12 lg:p-16">
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Seasonal Specials
              </h3>
              <p className="text-indigo-100 text-lg mb-6">
                Discover curated collections for every season with exclusive
                discounts and early access to new arrivals.
              </p>
              <button
                onClick={() => navigate("/seasonal-specials")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-300"
              >
                View Seasonal Offers
              </button>
            </div>
            {/* Decorative Elements */}
            <div className="absolute right-0 bottom-0 h-64 w-64 bg-white opacity-10 rounded-full -mb-16 -mr-16"></div>
            <div className="absolute right-32 top-0 h-40 w-40 bg-white opacity-10 rounded-full -mt-16 -mr-16"></div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 text-center">
          <p className="italic text-lg text-gray-600">
            "I absolutely love how I can shop by occasion. It's made finding the
            perfect outfit so much easier!"
          </p>
          <div className="mt-2 font-medium text-gray-900">
            — Sarah D., Loyal Customer
          </div>
        </div>
      </div>
    </section>
  );
};

export default Occasion;
