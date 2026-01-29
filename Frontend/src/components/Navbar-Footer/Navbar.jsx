import { useState } from "react";
import { IoCart, IoMenu, IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-white rounded-b-3xl ">
      <div className="flex justify-between items-center px-4 md:px-10 h-full rounded-b-3xl">
        <Link to="/">
          <img src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667839/logo_rrppc3.webp" alt="logo" className="w-15 md:w-32 cursor-pointer" />
        </Link>
        <div className="hidden md:flex gap-10 border px-6 py-3 rounded-full">
          <Link to="/" className="hover:text-blue-900">
            Home
          </Link>
          <Link to="/courses" className="hover:text-blue-900">
            Courses
          </Link>
          <Link to="/" className="hover:text-blue-900">
            Insight
          </Link>
          <Link to="/contact" className="hover:text-blue-900">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <IoCart className="text-2xl cursor-pointer text-blue-900" />
          <Link
            to="/login"
            className="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

        <button
          className="md:hidden text-3xl text-blue-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* For Mobile Hidden Feilds */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-white">
          <a href="/" className="border-b pb-2">
            Home
          </a>
          <a href="/" className="border-b pb-2">
            Courses
          </a>
          <a href="/" className="border-b pb-2">
            Insight
          </a>
          <a href="/" className="border-b pb-2">
            Contact
          </a>

          <div className="flex gap-3 pt-3 ">
            <Link
              to="/login"
              className="bg-blue-900 text-white px-4 py-2 rounded-full w-full"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-900 text-white px-4 py-2 rounded-full w-full cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
