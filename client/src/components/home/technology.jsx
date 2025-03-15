import React, { useState, useEffect } from "react";
import photo1 from "../../assets/Images/AI-body.png";
import photo2 from "../../assets/Images/smartOutfit.png";

const technologies = [
  {
    id: 1,
    name: "AI-Powered Body Sizing",
    image: photo1,
    description:
      "Upload a clear, full-body photo, and our AI-powered system will analyze your measurements and body shape to recommend the best size for you.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    features: [
      "Accurate within 97% of in-store measurements",
      "Works with any smartphone camera",
      "Privacy-focused with instant data processing",
    ],
  },
  {
    id: 2,
    name: "Smart Outfit Recommendations",
    image: photo2,
    description:
      "Select an item, and our AI suggests complementary pieces like jackets, jeans, or accessories to create the perfect outfit tailored to your style.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    features: [
      "Personalized style matching algorithms",
      "Season and occasion awareness",
      "Color palette harmonization",
    ],
  },
];

const Technology = () => {
  const [activeTab, setActiveTab] = useState(technologies[0].id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTabClick = (id) => {
    setIsVisible(false);
    setTimeout(() => {
      setActiveTab(id);
      setIsVisible(true);
    }, 300);
  };

  const activeTech = technologies.find((tech) => tech.id === activeTab);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide uppercase">
            Innovation
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Technologies We Use
          </h2>
          <div className="mt-4 mx-auto h-1 w-24 bg-indigo-600 rounded-full"></div>
          <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore the innovative technologies that power our personalized
            shopping experience and revolutionize the way you shop online.
          </p>
        </div>

        {/* Technology Display Area */}
        <div className="flex flex-col lg:flex-row gap-12 mt-16">
          {/* Left side - Technology Tabs */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-xl p-2">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => handleTabClick(tech.id)}
                  className={`w-full text-left p-5 mb-2 rounded-lg transition-all duration-300 flex items-center ${
                    activeTab === tech.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full mr-4 ${
                      activeTab === tech.id ? "bg-indigo-500" : "bg-indigo-100"
                    }`}
                  >
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{tech.name}</h3>
                    <p
                      className={`text-sm mt-1 ${
                        activeTab === tech.id
                          ? "text-indigo-100"
                          : "text-gray-500"
                      }`}
                    >
                      {tech.description.substring(0, 60)}...
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mt-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Ready to try it out?</h3>
              <p className="mb-6 text-indigo-100">
                Experience the future of shopping today with our
                state-of-the-art technology.
              </p>
              <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>

          {/* Right side - Active Technology Display */}
          <div className="lg:w-2/3">
            <div
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative">
                <img
                  className="w-full h-72 sm:h-96 object-cover object-center"
                  src={activeTech?.image}
                  alt={activeTech?.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {activeTech?.name}
                  </h3>
                  <span className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-full">
                    Powered by Machine Learning
                  </span>
                </div>
              </div>

              <div className="p-8">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {activeTech?.description}
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Features
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {activeTech?.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3">
                          <span className="font-semibold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      4.9/5 Customer Rating
                    </span>
                  </div>
                  <button className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-indigo-50 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="bg-white p-2 rounded-full inline-block">
                <div className="bg-indigo-100 p-4 rounded-full">
                  <svg
                    className="w-12 h-12 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mt-6 text-gray-900">
                Customer Stories
              </h3>
              <p className="text-gray-600 mt-2">
                See how our technology is making an impact on real customers.
              </p>
            </div>
            <div className="md:w-2/3 md:pl-12">
              <blockquote className="relative">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-indigo-200"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-lg md:text-xl text-gray-800 italic">
                  The AI body sizing technology is incredible! I was skeptical
                  at first, but the clothes I ordered fit perfectly. It's like
                  having a personal tailor in my pocket.
                </p>
                <footer className="mt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold">
                        SR
                      </div>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        Sarah Richards
                      </p>
                      <p className="text-sm text-gray-600">San Francisco, CA</p>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
