import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search, Heart } from "lucide-react"; // ✅ استيراد أيقونة المفضلة
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ استيراد useSelector

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = useSelector((state) => state.cart.cartItems.length);
  const favoriteItemsCount = useSelector(
    (state) => state.favorite.favorite.length
  ); // ✅ جلب عدد المنتجات المفضلة

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <section className="py-3 bg-[#D80D18] text-white text-center px-10">
        <p className="text-sm">Get free delivery for first order over 100 JD</p>
      </section>

      <header className="shadow-lg font-[sans-serif] tracking-wide relative z-50">
        <section className="flex items-center relative py-3 lg:px-10 px-4 border-gray-200 border-b bg-white lg:min-h-[70px] max-lg:min-h-[60px]">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={Logo} alt="logo" className="w-[150px]" />
          </Link>

          <div className="flex flex-wrap w-full items-center">
            {/* Search Bar */}
            <div className="xl:w-80 max-lg:hidden lg:ml-10 max-md:mt-4 relative flex items-center">
              <input
                type="text"
                placeholder="Search for clothes..."
                className="w-full bg-gray-100 border px-4 pl-10 rounded h-10 outline-none text-sm transition-all"
              />
              <Search className="w-5 h-5 absolute left-3 text-gray-500" />
            </div>

            <div className="ml-auto">
              <ul className="flex items-center">
                {/* ❤️ Favorite Products */}
                <li className="max-lg:py-2 px-4 cursor-pointer">
                  <Link to="/favorite" className="relative flex items-center">
                    <Heart className="w-6 h-6 inline text-red-500" />
                    {favoriteItemsCount > 0 && (
                      <span className="absolute left-auto -ml-1 -top-2 rounded-full bg-red-500 px-2 py-0 text-xs text-white">
                        {favoriteItemsCount}
                      </span>
                    )}
                  </Link>
                </li>

                {/* 🛒 Shopping Cart */}
                <li className="max-lg:py-2 px-4 cursor-pointer">
                  <Link to="/cart" className="relative flex items-center">
                    <ShoppingCart className="w-6 h-6 inline" />
                    {cartItemsCount > 0 && (
                      <span className="absolute left-auto -ml-1 -top-2 rounded-full bg-red-500 px-2 py-0 text-xs text-white">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </li>

                {/* Sign In Button */}
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-gray-800 border border-[#333] bg-transparent"
                >
                  Sign Up
                </Link>

                {/* Mobile Menu Toggle */}
                <li className="lg:hidden cursor-pointer">
                  <button onClick={toggleMenu}>
                    <Menu className="w-7 h-7" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mobile & Desktop Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          {/* Close Button */}
          <button
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border cursor-pointer"
            onClick={toggleMenu}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Links */}
          <ul className="lg:flex lg:items-center lg:justify-center px-10 py-3 bg-[#fff] min-h-[46px] gap-4 max-lg:space-y-4 max-lg:fixed max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-lg max-lg:overflow-auto z-50">
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                to="/new"
                className="text-black text-[15px] font-medium block"
              >
                New Arrivals
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                to="/men"
                className="text-black text-[15px] font-medium block"
              >
                Men
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                to="/women"
                className="text-black text-[15px] font-medium block"
              >
                Women
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                to="/kids"
                className="text-black text-[15px] font-medium block"
              >
                Kids
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                to="/sale"
                className="text-black text-[15px] font-medium block"
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default NavBar;
