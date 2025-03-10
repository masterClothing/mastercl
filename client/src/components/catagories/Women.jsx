import React, { useEffect, useState } from "react";
import axios from "axios";

const Women = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products/category/Women") // ✅ Ensure correct API call
      .then((response) => {
        console.log("✅ Women API Response:", response.data); // Debugging API Response
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          console.error("❌ No products found:", response.data.message);
        }
      })
      .catch((error) =>
        console.error("❌ Error fetching women's products:", error)
      );
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Women's Collection</h1>
      <p className="text-gray-600 mt-2">Discover stylish outfits for women.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={`http://localhost:5000/uploads/${product.image}`} // ✅ Ensure images exist
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
                onError={(e) => {
                  console.error("❌ Image not found:", e.target.src);
                  e.target.src = "/placeholder.jpg"; // ✅ Fallback image
                }}
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <p className="text-green-500 font-bold mt-2">${product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No women's products available.</p>
        )}
      </div>
    </div>
  );
};

export default Women;
