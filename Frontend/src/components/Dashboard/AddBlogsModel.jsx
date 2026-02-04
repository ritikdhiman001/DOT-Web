import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBlogsModel = ({ close, refresh }) => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    duration: "",
    description: "",
    author: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/admin/addblog", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });

      toast.success("Blog added successfully");
      close();
      refresh();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={close}
        >
          <X />
        </button>
        <h1 className="text-xl font-semibold mb-4">Add Blog</h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <label>Tag Name</label>
          <input
            type="text"
            name="tag"
            className="w-full border p-2 rounded"
            placeholder="eg. Compalince"
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          />

          <label>Duration</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="7 min read"
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />

          <label>Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            placeholder="John"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />

          <label>Author</label>
          <input
            type="text"
            name="author"
            className="w-full border p-2 rounded"
            placeholder="Compliance..."
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />

          <label>Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={close}
              className="px-4 py-2 border rounded cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-blue-700 hover:scale-95 text-white px-4 py-2 rounded cursor-pointer">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogsModel;
