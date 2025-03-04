import React from "react";
import photooccasion1 from "../../assets/Images/winter.jpg";
import photooccasion2 from "../../assets/Images/summer.jpg";
import photooccasion3 from "../../assets/Images/formal.jpg";
import photooccasion4 from "../../assets/Images/sport.jpg";

const occasions = [
  { name: "winter", image: photooccasion1 },
  { name: "summer", image: photooccasion2 },
  { name: "formal", image: photooccasion3 },
  { name: "sport", image: photooccasion4 },
];

const Occasion = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Shop by Occasion
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {occasions.map((occasion, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                className="w-full h-64 object-cover"
                src={occasion.image}
                alt={occasion.name}
              />
              <div className="absolute bottom-0 bg-black bg-opacity-80 text-white w-full py-2 text-lg font-semibold text-center">
                {occasion.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Occasion;
