import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { IoCart, IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const { isAuthorization, logout } = useAuth();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-white rounded-b-3xl shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-10 h-18 md:h-25">
        <Link to="/" className="shrink-0">
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667839/logo_rrppc3.webp"
            alt="logo"
            className="w-18 md:w-32 cursor-pointer"
          />
        </Link>

        <div className="hidden md:flex gap-10 border border-gray-100 px-6 py-3 rounded-full font-medium">
          <Link to="/" className="hover:text-blue-900 transition-colors">
            Home
          </Link>
          <Link to="/courses" className="hover:text-blue-900 transition-colors">
            Courses
          </Link>
          <Link
            to="/insights"
            className="hover:text-blue-900 transition-colors"
          >
            Insight
          </Link>
          <Link to="/contact" className="hover:text-blue-900 transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative p-2">
            <IoCart className="text-2xl cursor-pointer text-blue-900" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
          {isAuthorization ? (
            <div className="relative group">
              <IoPersonCircle className="text-3xl text-blue-900 cursor-pointer" />

              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-xl opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-900 text-white px-5 py-2 rounded-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-900 text-white px-5 py-2 rounded-full"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative p-2">
            <IoCart className="text-2xl cursor-pointer text-blue-900" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="text-3xl text-blue-900 outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-8 pt-2 rounded-b-3xl shadow-xl flex flex-col gap-1 w-full left-0 animate-in fade-in slide-in-from-top-2 duration-300">
          <Link
            to="/"
            className="border-b border-gray-50 py-3 text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="border-b border-gray-50 py-3 text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/insights"
            className="border-b border-gray-50 py-3 text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Insight
          </Link>
          <Link
            to="/contact"
            className="border-b border-gray-50 py-3 text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <div className="grid grid-cols-2 gap-3 pt-6">
            {isAuthorization ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="bg-red-100 text-red-600 px-4 py-3 rounded-2xl font-bold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
