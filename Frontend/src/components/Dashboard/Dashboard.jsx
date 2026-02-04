import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle size={50} className="animate-spin " />
      </div>
    );
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-200 p-4 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Total Users</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {stats.totalUsers}
          </p>
        </div>
        <div className="bg-gray-200 p-4 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Total Courses</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {stats.totalCourses}
          </p>
        </div>
        <div className="bg-gray-200 p-4 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Total Blogs</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {stats.totalBlogs}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
