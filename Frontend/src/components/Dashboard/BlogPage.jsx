import React, { useEffect, useState } from "react";
import AddBlogsModel from "./AddBlogsModel";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LoaderCircle,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  User,
} from "lucide-react";
import EditBlog from "./EditBlog";
import { apiBaseUrl } from "@/utils/common";

const BlogPage = () => {
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEdit = (blog) => setSelectedBlog(blog);
  const closeModal = () => setSelectedBlog(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/admin/getblog`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      setBlogs(res.data.data || []);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error("Server error. Try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${apiBaseUrl}/api/admin/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully");
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  if (loading) {
    return (
      <div className="flex h-64 justify-center items-center">
        <LoaderCircle size={50} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Blog Management
        </h1>
        <button
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 cursor-pointer font-semibold"
          onClick={() => setOpen(true)}
        >
          <Plus size={20} />
          Add New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No blogs published yet.</p>
        </div>
      ) : (
        <>
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                    Sr No
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                    Title
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                    Details
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                    Tag
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                    Date
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {blogs.map((blog, idx) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-400">{idx + 1}</td>
                    <td className="p-4 font-semibold text-gray-800 max-w-50 truncate">
                      {blog.title}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        {blog.author}
                      </div>
                      <div className="text-xs text-gray-400">
                        {blog.duration}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        {blog.tag}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {formatDate(blog.createAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                    {blog.tag}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-blue-600 hover:bg-gray-100 rounded-full"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="p-2 text-red-500 hover:bg-gray-100 rounded-full"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between border-t pt-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <User size={14} /> {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> {formatDate(blog.createAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {open && (
        <AddBlogsModel close={() => setOpen(false)} refresh={fetchBlogs} />
      )}
      {selectedBlog && (
        <EditBlog blogs={selectedBlog} close={closeModal} setBlogs={setBlogs} />
      )}
    </div>
  );
};

export default BlogPage;
