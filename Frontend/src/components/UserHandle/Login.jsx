import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Loader2, ArrowLeft } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);

      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message || "Login Successful");

      setFormData({ email: "", password: "" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid credentials or server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block relative">
          <img
            src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769593875/Login1_ave8la.png"
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-2 mb-8 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to site
          </Link>

          <h1 className="text-3xl text-gray-900 font-bold mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-8">
            Please enter your details to sign in.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                value={formData.email}
                required
                className={`w-full rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"} px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link
                  to="/forget-password"
                  size="sm"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  type={showPassword ? "text" : "password"}
                  className={`w-full rounded-xl border ${errors.password ? "border-red-500" : "border-gray-300"} px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-blue-200 flex justify-center items-center gap-2"
            >
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
