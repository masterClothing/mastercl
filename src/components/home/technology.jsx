import React from "react";
import photo1 from "../../assets/Images/AI-body.png";
import photo2 from "../../assets/Images/smartOutfit.png";
const technologies = [
  {
    name: "AI-Powered Body Sizing",
    image: photo1,
    description:
      "Upload a clear, full-body photo, and our AI-powered system will analyze your measurements and body shape to recommend the best size for you.",
  },
  {
    name: "Smart Outfit Recommendations",
    image: photo2,
    description:
      "Select an item, and our AI suggests complementary pieces like jackets, jeans, or accessories to create the perfect outfit tailored to your style.",
  },
];

const Technology = () => {
  return (
    <section className="py-16 bg-white  pt-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Technologies We Use
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore the innovative technologies that power our personalized
          shopping experience.
        </p>
        <div className="grid md:grid-cols-2 gap-8 justify-center">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                className="w-full h-52 object-cover"
                src={tech.image}
                alt={tech.name}
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{tech.name}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
