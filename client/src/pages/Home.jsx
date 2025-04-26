import React from "react";
import Hero from "../components/home/Hero";
import CategorySectoin from "../components/home/CategorySectoin";
import Technology from "../components/home/technology";
import Occasion from "../components/home/occasion";
import Trending from "../components/home/trending";
import DiscoverMore from "../components/home/discoverMore";


const Home = () => {
  return (
    <div>
      <Hero />
      <CategorySectoin />
      <Trending />
      <Technology />
      <Occasion />
      <button
        className="fixed bottom-6 right-6 bg-black text-white rounded-full p-3 shadow-lg hover:bg-gray-900 transition-colors z-10 hover:scale-110 transition-transform"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
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
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Home;
