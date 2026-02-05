import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LoaderCircle,
  Users,
  BookOpen,
  FileText,
  TrendingUp,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
            },
          },
        );
        setStats(res.data.data);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("AdminToken");
          navigate("/admin/login");
        } else {
          console.error("Dashboard stats error", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate]);

  if (loading)
    return (
      <div className="flex h-[70vh] flex-col justify-center items-center gap-4">
        <LoaderCircle size={60} className="animate-spin text-blue-600" />
      </div>
    );

  const cardData = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      link: "/admin/users",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: <BookOpen size={24} />,
      color: "text-green-600",
      bg: "bg-green-50",
      link: "/admin/courses",
    },
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: <FileText size={24} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      link: "/admin/blogs",
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Overview
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Welcome back, <span className="text-blue-600">Admin</span>. Here's
            your fleet's status.
          </p>
        </div>
        <div className="text-sm font-bold text-gray-400 bg-gray-100 px-4 py-2 rounded-full hidden md:block">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cardData.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <div
              className={`absolute -right-4 -top-4 w-24 h-24 ${item.bg} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500`}
            />

            <div className="flex justify-between items-start relative z-10">
              <div
                className={`${item.bg} ${item.color} p-4 rounded-2xl shadow-inner`}
              >
                {item.icon}
              </div>
              <TrendingUp
                size={22}
                className="text-gray-200 group-hover:text-green-500 transition-colors"
              />
            </div>

            <div className="mt-6 relative z-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {item.title}
              </p>
              <h3 className="text-5xl font-black text-gray-900 mt-2 tracking-tighter">
                {item.value.toLocaleString()}
              </h3>
            </div>

            <div className="mt-8 flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
              Explore <ArrowRight size={18} className="ml-2" />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />

        <div className="flex items-center gap-3 mb-8">
          <PlusCircle className="text-blue-400" size={28} />
          <h3 className="text-2xl font-black tracking-tight">
            Quick Management
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {[
            {
              label: "Add Course",
              path: "/admin/courses",
              color: "bg-white/5 hover:bg-white/10",
            },
            {
              label: "Write Blog",
              path: "/admin/blogs",
              color: "bg-white/5 hover:bg-white/10",
            },
            {
              label: "Manage Users",
              path: "/admin/users",
              color: "bg-white/5 hover:bg-white/10",
            },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => action.path && navigate(action.path)}
              className={`${action.color} py-5 px-6 rounded-2xl text-center font-bold text-sm transition-all active:scale-95 border border-white/5`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
