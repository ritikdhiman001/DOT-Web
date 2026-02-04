import { Navigate, Route, Routes } from "react-router-dom";
import HeroPage from "./Pages/HeroPage";
import Register from "./UserHandle/Register";
import Login from "./UserHandle/Login";
import CoursesPage from "./Courses/CoursesPage";
import ContactPage from "./Contact/ContactPage";
import AdminLayout from "./Dashboard/AdminLayout";
import Dashboard from "./Dashboard/Dashboard";
import UserManagement from "./Dashboard/UserManagement";
import CourseManagement from "./Dashboard/CourseManagement";
import BlogPage from "./Dashboard/BlogPage";
import AdminLogin from "./UserHandle/AdminLogin";
import InsightsHome from "./Insights/InsightsHome";
import AdminProtectedRoute from "./AdminProtectedRoute";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/insights" element={<InsightsHome />} />

      {/* ADMIN LOGIN (SEPARATE) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN DASHBOARD */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="blogs" element={<BlogPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Navigation;
