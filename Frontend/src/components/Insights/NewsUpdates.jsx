import { Calendar, User } from "lucide-react";
import Footer from "../Navbar-Footer/Footer";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const NewsUpdates = () => {
  const [blogs, setBlogs] = useState([]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/getblog");
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
      <div className="bg-[#F4F8FC] text-center pt-10">
        <h1 className="text-[30px] font-bold">Latest News & Updates</h1>
        <p className="text-[23px] text-gray-600">
          Stay current on critical FMCSA regulations and safety news
        </p>

        <div className="grid grid-cols-3 px-25 py-10 gap-9 ">
          {blogs.map((e, idx) => (
            <div
              className="border-2 p-5 border-gray-400 rounded-2xl bg-white hover:border-blue-700 hover:scale-110 transition-transform"
              key={idx}
            >
              <div className="flex justify-between items-center">
                <span className="bg-blue-800 text-white  px-4 py-1 rounded-2xl text-[14px]">
                  {e.tag}
                </span>
                <span className="text-[13px] text-gray-600 ">{e.duration}</span>
              </div>
              <div>
                <h1 className="text-[17px] font-bold pt-2 mb-2">{e.title}</h1>
                <p className="text-gray-600 text-[16px] line-clamp-4">
                  {e.description}
                </p>
                <hr className="text-gray-400 mt-2" />
              </div>
              <div className="flex items-center justify-between text-gray-600 mt-3">
                <p className="flex justify-center items-center gap-1 text-[15px]">
                  {" "}
                  <User size={16} />
                  {e.author}...
                </p>
                <p className="flex justify-center items-center gap-1 text-[15px]">
                  <Calendar size={16} />
                  {formatDate(e.createAt)}
                </p>
              </div>
              <button className="border w-full border-gray-400 rounded-2xl px-4 py-2 text-[14px] mt-4 hover:bg-gray-100 ">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsUpdates;
