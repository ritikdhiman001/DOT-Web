import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import HeroPage from "./Pages/HeroPage";
import ContactPage from "./Contact/ContactPage";
import InsightsHome from "./Insights/InsightsHome";
import Login from "./UserHandle/Login";
import Register from "./UserHandle/Register";
import AdminLogin from "./UserHandle/AdminLogin";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "./Dashboard/AdminLayout";
import Dashboard from "./Dashboard/Dashboard";
import UserManagement from "./Dashboard/UserManagement";
import CourseManagement from "./Dashboard/CourseManagement";
import BlogPage from "./Dashboard/BlogPage";
import Navbar from "./Navbar-Footer/Navbar";
import Footer from "./Navbar-Footer/Footer";
import CoursesPage from "./Courses/CoursesPage";
import CartPage from "./Courses/CartPage";
import PurchasesCourse from "./Courses/PurchasesCourse";

const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const Navigation = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HeroPage />} />
        <Route path="/courses" element={<CoursesPage />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsHome />} />
        <Route path="/purchasescourse" element={<PurchasesCourse />} />
      </Route>
      <Route path="/cart" element={<CartPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="blogs" element={<BlogPage />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-9xl font-black text-gray-200">404</h1>
            <p className="text-2xl font-bold text-gray-800 -mt-8">
              Page Not Found
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
            >
              Go to Home
            </button>
          </div>
        }
      />
    </Routes>
  );
};

export default Navigation;
