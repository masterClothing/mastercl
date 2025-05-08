import React from "react";

const SuggestedProducts = () => {
  return (
    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-8 text-black flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-F0BB78"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        You Might Also Like
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="group">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
              <img
                src={`/api/placeholder/300/300`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                alt={`Related product ${index}`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-F0BB78"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="w-full bg-F0BB78 hover:bg-amber-400 text-black font-medium py-2 rounded-lg transition-colors">
                  Quick View
                </button>
              </div>
            </div>
            <div className="mt-3 px-1">
              <h3 className="text-sm font-medium text-black truncate">
                Premium Product {index}
              </h3>
              <p className="text-gray-500 text-xs mt-1">Luxury Collection</p>
              <div className="mt-1 font-medium text-black">
                {(99.99 - index * 10).toFixed(2)} JD
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
