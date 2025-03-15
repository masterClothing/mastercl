import React from "react";
import { Link } from "react-router-dom";
import C1 from "../../assets/Images/C1.png";
import C2 from "../../assets/Images/C2.png";
import C3 from "../../assets/Images/C3.png";

const CategoryCard = ({
  title,
  category,
  image,
  cta,
  bgColor,
  ctaColor = "bg-indigo-600",
  textColor = "text-gray-800",
  cardType = "standard",
}) => {
  // Different card styles based on type
  const cardStyles = {
    featured: "lg:col-span-2 lg:h-96",
    standard: "h-80",
    compact: "h-64",
  };

  return (
    <div
      className={`relative overflow-hidden group rounded-xl shadow-md transition-all duration-300 hover:shadow-xl ${bgColor} ${cardStyles[cardType]}`}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

      {/* Content container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 mb-2">
            {category}
          </span>
          <h3
            className={`text-2xl lg:text-3xl font-bold ${textColor} group-hover:text-white transition-colors duration-300`}
          >
            {title}
          </h3>
        </div>

        {cta && (
          <Link
            to="/shop"
            className="self-start mt-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          >
            <button
              className={`py-2.5 px-6 ${ctaColor} hover:bg-opacity-90 text-white rounded-lg font-medium flex items-center`}
            >
              {cta}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </Link>
        )}
      </div>

      {/* Image container */}
      {cardType === "featured" ? (
        <div className="absolute right-0 top-0 h-full w-1/2 lg:w-3/5">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="absolute right-0 top-0 h-full w-full">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
    </div>
  );
};

const CategorySection = () => {
  // Define category data
  const categories = [
    {
      title: "Women's Collection",
      category: "Fashion",
      image: C1,
      cta: "Explore Collection",
      bgColor: "bg-rose-50",
      ctaColor: "bg-rose-600",
      textColor: "text-gray-800",
      cardType: "featured",
    },
    {
      title: "Kids Essentials",
      category: "Supplies & Apparel",
      image: C2,
      cta: "Shop Now",
      bgColor: "bg-sky-50",
      ctaColor: "bg-sky-600",
      textColor: "text-gray-800",
      cardType: "standard",
    },
    {
      title: "Men's Style",
      category: "Fashion & Accessories",
      image: C3,
      cta: "View Collection",
      bgColor: "bg-amber-50",
      ctaColor: "bg-amber-600",
      textColor: "text-gray-800",
      cardType: "standard",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section header with animated underline */}
        <div className="relative mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-sm font-medium text-indigo-600 tracking-wider uppercase">
                Curated Collections
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Top Categories
              </h2>
              <div className="mt-2 h-1 w-20 bg-indigo-600 rounded"></div>
            </div>

            <Link
              to="/category/list"
              className="group mt-6 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-300"
            >
              <span>View All Categories</span>
              <svg
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Category grid with different layouts for responsive design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 gap-0.5 md:grid-cols-4 bg-white rounded-xl overflow-hidden shadow">
          {[
            { label: "Categories", value: "25+" },
            { label: "Products", value: "10,000+" },
            { label: "Brands", value: "120+" },
            { label: "Happy Customers", value: "50,000+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white px-4 py-6 sm:px-6 lg:px-8"
            >
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 flex items-baseline">
                <span className="text-3xl font-extrabold text-indigo-600">
                  {stat.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
