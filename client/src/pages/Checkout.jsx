import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ استيراد SweetAlert2
import { clearCart } from "../Slices/cartSlice"; // ✅ حذف المنتجات بعد الدفع

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ✅ إذا كانت السلة فارغة، ارجع للمستخدم للصفحة الرئيسية
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  // ✅ دالة الدفع التي تعرض SweetAlert2
  const handlePayment = () => {
    Swal.fire({
      title: "Payment Successful!",
      text: "Thank you for your order! You will receive a confirmation email soon.",
      icon: "success",
      confirmButtonText: "OK",
      timer: 5000, // ✅ إغلاق تلقائي بعد 5 ثواني
      timerProgressBar: true,
    }).then(() => {
      dispatch(clearCart()); // ✅ حذف المنتجات من السلة
      navigate("/"); // ✅ العودة إلى الصفحة الرئيسية بعد الإغلاق
    });
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="max-lg:max-w-xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
            <div className="text-center max-lg:hidden">
              <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">
                Checkout
              </h2>
            </div>

            <form className="lg:mt-16">
              <h2 className="text-xl font-bold text-gray-800">Shipping Info</h2>
              <div className="grid sm:grid-cols-2 gap-8 mt-8">
                <input type="text" placeholder="Name" className="input-style" />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-style"
                />
                <input
                  type="text"
                  placeholder="Street address"
                  className="input-style"
                />
                <input type="text" placeholder="City" className="input-style" />
                <input
                  type="text"
                  placeholder="State"
                  className="input-style"
                />
                <input
                  type="number"
                  placeholder="Postal code"
                  className="input-style"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-8">
                Payment Method
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  Credit / Debit Card
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  PayPal
                </label>
              </div>

              {/* ✅ زر الدفع مع SweetAlert */}
              <button
                type="button"
                className="btn-primary mt-6"
                onClick={handlePayment}
              >
                Confirm Payment ${totalAmount.toFixed(2)}
              </button>
            </form>
          </div>

          <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
            <div className="relative h-full">
              <div className="p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
                <h2 className="text-xl font-bold text-gray-800">
                  Order Summary
                </h2>
                <div className="space-y-6 mt-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                        <img
                          src={item.image}
                          className="w-full object-contain"
                          alt={item.name}
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm text-gray-800 font-bold">
                          {item.name}
                        </h3>
                        <ul className="text-xs text-gray-800 space-y-1 mt-2">
                          <li className="flex flex-wrap gap-4">
                            Quantity{" "}
                            <span className="ml-auto">{item.quantity}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Total Price{" "}
                            <span className="ml-auto">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-sm text-gray-800 font-bold">
                  Total{" "}
                  <span className="ml-auto">${totalAmount.toFixed(2)}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
