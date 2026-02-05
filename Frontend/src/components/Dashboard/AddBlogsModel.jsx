import axios from "axios";
import { X, Loader2, BookOpen } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBlogsModel = ({ close, refresh }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    duration: "",
    description: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/admin/addblog", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });

      toast.success("Blog added successfully");
      refresh();
      close();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-150 p-4">
      <div className="absolute inset-0" onClick={close}></div>
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-5 border-b bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BookOpen className="text-blue-600" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Create New Blog</h1>
          </div>
          <button
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            onClick={close}
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Blog Title
              </label>
              <input
                required
                type="text"
                name="title"
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tag
                </label>
                <input
                  required
                  type="text"
                  name="tag"
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  required
                  type="text"
                  name="duration"
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Author Name
              </label>
              <input
                required
                type="text"
                name="author"
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description / Content
              </label>
              <textarea
                required
                name="description"
                rows="4"
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                placeholder="Write your blog content here..."
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={close}
              className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 disabled:bg-blue-400 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogsModel;
