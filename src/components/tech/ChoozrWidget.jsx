import React, { useEffect } from "react";

const ChoozrWidget = ({ productId }) => {
  useEffect(() => {
    if (window.Choozr) {
      window.Choozr.create({
        productId: productId, // Unique product ID
        containerId: "choozr-widget",
        apiKey: import.meta.env.VITE_CHOOZR_API_KEY, // Load API key securely
      });
    }
  }, [productId]);

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">🛍️ Find Your Perfect Size</h2>
      <div id="choozr-widget" className="mt-4"></div>
    </div>
  );
};

export default ChoozrWidget;
