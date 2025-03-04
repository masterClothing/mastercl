import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../Slices/cartSlice"; // ✅ تحديث الكمية
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="font-sans bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 🛒 Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm divide-y">
            {cartItems.length === 0 ? (
              <p className="text-center p-6 text-gray-500">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start gap-6 p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      className="w-full h-full object-contain rounded-lg"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {/* ❌ زر الحذف */}
                      <button
                        type="button"
                        className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors duration-200"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                          <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* 🔢 التحكم في الكمية */}
                  <div className="ml-auto text-right">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-24">
                      <button
                        type="button"
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() =>
                          item.quantity > 1 &&
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                      >
                        ➖
                      </button>
                      <span className="text-sm font-semibold px-3">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        ➕
                      </button>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h4>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 💰 Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-4">
              Order Summary
            </h3>

            <ul className="text-gray-800 divide-y mt-4">
              <li className="flex justify-between text-sm py-3">
                Subtotal <span className="font-bold">${total.toFixed(2)}</span>
              </li>
              <li className="flex justify-between text-sm py-3">
                Shipping <span className="font-bold">$0.00</span>
              </li>
              <li className="flex justify-between text-sm py-3">
                Tax <span className="font-bold">$0.00</span>
              </li>
              <li className="flex justify-between text-sm py-3 font-bold">
                Total <span>${total.toFixed(2)}</span>
              </li>
            </ul>

            <Link
              to="/checkout"
              className="block mt-6 w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
            >
              Make Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
