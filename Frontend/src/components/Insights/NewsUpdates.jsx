import { Calendar, User } from "lucide-react";
import Footer from "../Navbar-Footer/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiBaseUrl } from "@/utils/common";

const NewsUpdates = () => {
  const [blogs, setBlogs] = useState([]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/admin/getblog`);
      setBlogs(res.data.data);
    } catch {
      toast.error("Unable to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="bg-[#F4F8FC] text-center pt-10 px-4 md:px-0">
        <h1 className="md:text-[30px] text-[22px] font-bold">
          Latest News & Updates
        </h1>
        <p className="md:text-[23px] text-[16px] text-gray-600 mt-2">
          Stay current on critical FMCSA regulations and safety news
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 p-5 md:p-10 gap-6 md:gap-8 max-w-7xl mx-auto">
          {blogs.map((e, idx) => (
            <div
              className="border-2 p-5 border-gray-400 rounded-2xl bg-white flex flex-col justify-between hover:border-blue-700 md:hover:scale-105 transition-all duration-300 shadow-sm"
              key={idx}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-800 text-white px-4 py-1 rounded-2xl text-[12px] md:text-[14px] font-medium">
                    {e.tag}
                  </span>
                  <span className="text-[12px] md:text-[13px] text-gray-600">
                    {e.duration}
                  </span>
                </div>

                <div className="text-left">
                  <h1 className="text-[18px] md:text-[20px] font-bold mb-2 leading-tight">
                    {e.title}
                  </h1>
                  <p className="text-gray-600 text-[14px] md:text-[16px] line-clamp-3">
                    {e.description}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <hr className="border-gray-200 mb-4" />
                <div className="flex items-center justify-between text-gray-600 text-[13px] md:text-[15px]">
                  <p className="flex items-center gap-1">
                    <User size={16} className="text-blue-800" />
                    {e.author}
                  </p>
                  <p className="flex items-center gap-1">
                    <Calendar size={16} className="text-blue-800" />
                    {formatDate(e.createdAt)}
                  </p>
                </div>

                <button className="w-full border border-gray-400 rounded-2xl px-4 py-2 text-[14px] mt-5 font-semibold hover:bg-blue-800 hover:text-white hover:border-blue-800 transition-colors cursor-pointer active:scale-95">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsUpdates;
