import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookCheck,
  MailOpen,
  Menu,
  X,
  LogOut,
  CircleDollarSign,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AdminToken");
    navigate("/admin/login");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const navItems = [
    { to: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/admin/users", icon: <Users size={20} />, label: "Users" },
    { to: "/admin/courses", icon: <BookCheck size={20} />, label: "Courses" },
    { to: "/admin/blogs", icon: <MailOpen size={20} />, label: "Blogs" },
    { to: "/admin/payments", icon: <CircleDollarSign />, label: "Sale" },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b p-4 flex justify-between items-center z-50">
        <span className="font-bold text-lg text-blue-800">Admin Panel</span>
        <button onClick={toggleSidebar} className="p-2 text-gray-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <aside
        className={`
        fixed top-0 left-0 z-50 h-screen bg-white border-r transition-transform duration-300
        w-64 lg:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col /* Isse hum children ko stretch kar sakte hain */
      `}
      >
        <div className="p-6 text-xl font-bold border-b text-center hidden lg:block text-blue-800">
          Admin Panel
        </div>

        <div className="flex flex-col justify-between flex-1 overflow-y-auto mt-16 lg:mt-0">
          <nav className="p-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeSidebar}
                end={item.to === "/admin"}
                className={({ isActive }) => `
                  flex gap-3 items-center px-4 py-3 rounded-xl transition-all text-md font-medium
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100 bg-white">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-red-600 font-bold bg-red-50 px-4 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
