import React, { useState } from "react";
import driverImg from "/Login1.png";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dotNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData,
      );

      toast.success(res.data.message);

      setFormData({
        dotNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="absolute top-10 px-2 left-5 ">
          <Link
            to="/"
            className="text-sm text-gray-800 hover:text-blue-600 flex items-center gap-1 "
          >
            ← Back to site
          </Link>
        </div>
        <div className="flex rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-4">
          <div className="flex flex-col px-8 py-15 justify-center items-center w-120">
            <h2 className="text-[22px] text-center font-bold">
              Create Your Account
            </h2>
            <p className="text-gray-500 text-center mb-4 text-[17px]">
              Join us to stay compliant and grow your business.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 ">
                <label className="text-sm mb-1">
                  DOT Number <span className="text-lg text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="dotNumber"
                    placeholder="Enter your DOT number"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none  border-gray-300"
                    onChange={handleChange}
                    value={formData.dotNumber}
                  />

                  <button
                    type="button"
                    className="bg-blue-600 text-center px-3 py-3 text-white rounded-xl cursor-pointer"
                  >
                    <IoSearch />
                  </button>
                </div>
                {errors.dotNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dotNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm mb-1 font-medium">
                    First Name <span className="text-lg text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter a First Name"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 "
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-center mt-1">
                  <label className="text-sm mb-1 font-medium">Last Name </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter a Last Name"
                    className="w-full px-3 py-2 border rounded-md border-gray-300"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1 font-medium">
                  Email Address <span className="text-lg text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 "
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1 font-medium">
                  Phone Number <span className="text-lg text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 "
                  onChange={handleChange}
                  value={formData.phone}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1 font-medium">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Your Company Name (optional)"
                  className="w-full px-3 py-2 border rounded-md border-gray-300"
                  onChange={handleChange}
                  value={formData.companyName}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-1 font-medium">
                  Password <span className="text-lg text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 pr-10"
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={formData.password}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 flex cursor-pointer items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition "
              >
                Create Account
              </button>
              <h2 className="text-center">
                Already have an Account ?
                <Link to="/login" className="text-blue-600">
                  Sign in here
                </Link>
              </h2>
              <p className="text-center text-sm text-gray-400">
                By Creating an account, you agree to our terms of service and
                privacy policy.
              </p>
            </form>
          </div>

          <div className="w-115">
            <img
              src={driverImg}
              alt="img"
              className="h-full w-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
