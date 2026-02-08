import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { apiBaseUrl } from "@/utils/common";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleDotSearch = async () => {
    if (!formData.dotNumber) {
      toast.error("Please enter a DOT number first");
      return;
    }

    setIsSearching(true);
    try {
      const res = await axios.get(
        "https://data.transportation.gov/resource/az4n-8mr2.json",
        { params: { dot_number: formData.dotNumber } },
      );

      if (!res.data || res.data.length === 0) {
        toast.error("No record found for this DOT number");
        return;
      }

      const dotData = res.data[0];
      const fullName = dotData.legal_name || "";
      const [first, ...rest] = fullName.split(" ");

      setFormData((prev) => ({
        ...prev,
        firstName: first || "",
        lastName: rest.join(" ") || "",
        companyName: fullName,
        phone: dotData.phone || "",
      }));
      toast.success("Company details retrieved!");
    } catch {
      toast.error("System busy. Please fill details manually.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${apiBaseUrl}/api/register`,
        formData,
      );
      toast.success(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-6xl mb-4">
        <Link
          to="/"
          className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors w-fit font-medium"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to site
        </Link>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="w-full md:w-1/2 p-8 lg:p-12 overflow-y-auto max-h-[90vh]">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 mt-2">
              Get started with your compliance dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="text-sm font-semibold text-gray-700">
              Enter DOT Number *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="dotNumber"
                className="w-full px-4 py-2.5 border rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                value={formData.dotNumber}
              />
              <button
                type="button"
                onClick={handleDotSearch}
                disabled={isSearching}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
              >
                {isSearching ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <IoSearch size={20} />
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  First Name *
                </label>
                <input
                  name="firstName"
                  className="w-full px-4 py-2.5 border rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={handleChange}
                  value={formData.firstName}
                  required
                />
                {errors.firstName && (
                  <span className="text-red-500 text-[10px] font-bold uppercase">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  name="lastName"
                  className="w-full px-4 py-2.5 border rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2.5 border rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                value={formData.email}
                required
              />
              {errors.email && (
                <span className="text-red-500 text-[10px] font-bold uppercase">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2.5 border rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                value={formData.phone}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Company Name
              </label>
              <input
                name="companyName"
                className="w-full px-4 py-2.5 border rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                value={formData.companyName}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full px-4 py-2.5 border rounded-xl border-gray-300 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-[10px] font-bold uppercase">
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-[0.98] disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:flex md:w-1/2 relative overflow-hidden flex-col justify-end p-12 text-white">
          <div className="absolute top-0 left-0 w-full h-full">
            <img
              src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769593875/Login1_ave8la.png"
              className="w-full h-full object-cover"
              alt="Background"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
