import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { IoTrashOutline, IoAdd, IoRemove, IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import { apiBaseUrl } from "@/utils/common";
import { useAuth } from "@/context/AuthContext";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, decrementQuantity, clearCart } =
    useCart();
  const navigate = useNavigate();
  const { fetchOrders } = useAuth();

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please Login First");
        navigate("/login");
        return;
      }

      if (cart.length === 0) {
        toast.error("Cart is Empty");
        return;
      }

      const { data } = await axios.post(
        `${apiBaseUrl}/api/payment/create-order`,
        {
          courseId: cart[0].id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.free) {
        await fetchOrders();
        clearCart();
        toast.success("Enrolled Successfull ");
        navigate("/purchasescourse");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: "INR",
        name: "Ritik Academy",
        description: "Course Purchase",
        order_id: data.order.id,

        handler: async function (response) {
          await axios.post(
            `${apiBaseUrl}/api/payment/verify`,
            {
              ...response,
              courseId: cart[0].id,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          await fetchOrders();
          clearCart();
          toast.success("Courses Purchased Successfully 🎉");

          console.log("Payment success, redirecting...");
          navigate("/purchasescourse");
        },

        theme: {
          color: "#1e3a8a",
        },
      };

      if (!window.Razorpay) {
        toast.error("Payment SDK failed to load");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment failed");
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-6xl md:text-8xl mb-4 animate-bounce">🛒</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-xs">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/courses"
          className="bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-all shadow-lg text-center"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 md:py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <Link
            to="/courses"
            className="p-2 bg-white rounded-full shadow-sm hover:text-blue-900 transition-all"
          >
            <IoArrowBack size={20} className="md:w-6 md:h-6" />
          </Link>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            Shopping Cart
          </h1>
          <span className="text-gray-400 font-medium text-sm md:text-base">
            ({cart.length} items)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border-none rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-4 md:gap-6"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded-xl bg-gray-100"
                />

                <div className="flex-1 text-center sm:text-left w-full">
                  <h3 className="font-bold text-lg md:text-xl text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-blue-800 font-semibold mt-1">
                    ${item.price}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 md:gap-8">
                  <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          decrementQuantity(item.id);
                        } else {
                          removeFromCart(item.id);
                        }
                      }}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      {item.quantity === 1 ? (
                        <IoTrashOutline size={18} />
                      ) : (
                        <IoRemove size={18} />
                      )}
                    </button>
                    <span className="font-bold text-base w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-gray-600 hover:text-blue-900 transition-colors"
                    >
                      <IoAdd size={18} />
                    </button>
                  </div>

                  <div className="text-right sm:min-w-20">
                    <p className="hidden sm:block text-xs text-gray-400 uppercase tracking-wider">
                      Total
                    </p>
                    <p className="font-bold text-lg md:text-xl text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 lg:sticky lg:top-28">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-100 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-bold text-gray-800">
                    Total Amount
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-blue-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-800 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-blue-900/20"
              >
                Proceed to Checkout
              </button>

              <p className="text-center text-gray-400 text-xs md:text-sm mt-4">
                Secure SSL Encryption & 30-Day Money Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
