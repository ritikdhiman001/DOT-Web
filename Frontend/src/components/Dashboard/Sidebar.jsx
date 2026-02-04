import { LayoutDashboard } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { BookCheck } from "lucide-react";
import { MailOpen } from "lucide-react";
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AdminToken");
    navigate("/admin/login");
  };
  return (
    <div className="w-64 shadow-lg text-black">
      <div className="p-5 text-xl font-bold border-b text-center">
        Admin Panel
      </div>
      <nav className="flex flex-col p-4 gap-2">
        <NavLink
          to="/admin"
          className="sidebar-link flex gap-2 items-center text-md"
        >
          <LayoutDashboard color="gray" />
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          className="sidebar-link flex  gap-2 items-center text-md"
        >
          <Users color="gray" />
          Users
        </NavLink>
        <NavLink
          to="/admin/courses"
          className="sidebar-link flex gap-2 items-center text-md"
        >
          <BookCheck color="gray" /> Courses
        </NavLink>
        <NavLink
          to="/admin/blogs"
          className="sidebar-link flex gap-2 items-center text-md"
        >
          <MailOpen color="gray" /> Blogs
        </NavLink>
        <button
          onClick={handleLogout}
          className="mt-4 text-red-600 font-semibold cursor-pointer border-2 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
