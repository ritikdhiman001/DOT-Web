import { Route, Routes } from "react-router-dom";
import HeroPage from "./Pages/HeroPage";
import Register from "./UserHandle/Register";
import Login from "./UserHandle/Login";
import CoursesPage from "./Courses/CoursesPage";
import ContactPage from "./Contact/ContactPage";
import AdminLayout from "./Dashboard/AdminLayout";
import Dashboard from "./Dashboard/Dashboard";
import UserManagement from "./Dashboard/UserManagement";
import CourseManagement from "./Dashboard/CourseManagement";

const Navigation = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/courses" element={<CourseManagement />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Navigation;
