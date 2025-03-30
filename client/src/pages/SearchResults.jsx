// pages/SearchResults.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchResults,
  setIsSearching,
  clearSearch,
} from "../Slices/searchSlice";
import { searchProducts } from "../api/products";
import { useNavigate } from "react-router-dom";
import store from "../store"; // Import the store to access getState

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, results, isSearching } = useSelector((state) => state.search);

  useEffect(() => {
    if (query.trim()) {
      const fetchResults = async () => {
        dispatch(setIsSearching(true));
        try {
          // Pass the getState function to searchProducts
          const data = await searchProducts(query, () => store.getState());
          dispatch(setSearchResults(data));
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          dispatch(setIsSearching(false));
        }
      };

      const debounceTimer = setTimeout(fetchResults, 500);
      return () => clearTimeout(debounceTimer);
    } else {
      dispatch(setSearchResults([]));
    }
  }, [query, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {isSearching ? "Searching..." : `Search Results for "${query}"`}
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        !isSearching && query && <p>No products found matching your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
