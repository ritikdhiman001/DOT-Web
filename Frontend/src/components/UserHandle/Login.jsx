import { useState } from "react";
import driverImg from "/Login1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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
      const res = await axios.post("http://localhost:5000/api/login", formData);

      toast.success(res.data.message);

      setFormData({
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block">
            <img
              src={driverImg}
              alt="driver Img"
              className=" h-full w-full object-cover"
            />
          </div>
          <div className="p-8 md:p-12">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 mb-6"
            >
              ← Back to site
            </Link>
            <h1 className="text-2xl text-gray-900 font-bold text-center">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-1 mb-8 text-center">
              Sign in to access your dashboard.
            </p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-lg text-red-500">*</span>
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Password <span className="text-lg text-red-500">*</span>
                  </label>
                  <a
                    href="/forget-password"
                    className="font-sm text-blue-600 hover:underline"
                  >
                    Forgot Password ?
                  </a>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10"
                    autoComplete="current-password"
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
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 scale-95 cursor-pointer"
              >
                Sign In
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
              Don&apos;t have an account?
              <Link to="/register" className="text-blue-600 hover:underline">
                SignUp
              </Link>
            </p>
            <p className="flex items-center justify-center gap-1 text-xs  text-gray-400 mt-4">
              🔒 Sessions expire automatically for security
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
