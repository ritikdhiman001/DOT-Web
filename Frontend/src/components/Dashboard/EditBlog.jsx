import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const EditBlog = ({ close, setBlogs, blogs }) => {
  const [data, setData] = useState({
    title: blogs.title || "",
    description: blogs.description || "",
    author: blogs.author || "",
    tag: blogs.tag || "",
    duration: blogs.duration || "",
  });

  const handleUpdate = async () => {
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

      toast.success("Blog Update Succuessfull");
      close();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error("Failed to update blog");
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-105">
        <h3 className="text-xl font-bold mb-4 text-center"> Edit Blog</h3>

        <label>Title</label>
        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />

        <label>Description</label>
        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        <label>Author</label>
        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          value={data.author}
          onChange={(e) => setData({ ...data, author: e.target.value })}
        />

        <label>Tag</label>
        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          value={data.tag}
          onChange={(e) => setData({ ...data, tag: e.target.value })}
        />

        <label>Duration</label>
        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          value={data.duration}
          onChange={(e) => setData({ ...data, duration: e.target.value })}
        />
        <div className="flex justify-end items-center gap-4">
          <button
            className="px-4 py-2 border-2 rounded-lg cursor-pointer"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 px-4 py-2 border-2 rounded-lg cursor-pointer text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
