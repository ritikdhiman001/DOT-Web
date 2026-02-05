import axios from "axios";
import { X, Save, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const EditBlog = ({ close, setBlogs, blogs }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: blogs.title || "",
    description: blogs.description || "",
    author: blogs.author || "",
    tag: blogs.tag || "",
    duration: blogs.duration || "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/updateBlog/${blogs.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        },
      );

      setBlogs((prev) =>
        prev.map((b) => (b.id === blogs.id ? res.data.data : b)),
      );

      toast.success("Blog updated successfully!");
      close();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error("Failed to update blog");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-200 p-4">
      <div className="absolute inset-0" onClick={close}></div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Edit Blog Post
          </h3>
          <button
            onClick={close}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={data.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Author
              </label>
              <input
                name="author"
                type="text"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={data.author}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tag
              </label>
              <input
                name="tag"
                type="text"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={data.tag}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Duration
            </label>
            <input
              name="duration"
              type="text"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={data.duration}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              value={data.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="p-5 border-t bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
          <button
            className="w-full sm:w-auto px-6 py-2 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={close}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 px-8 py-2 rounded-xl font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-blue-400"
            onClick={handleUpdate}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
