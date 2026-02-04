import React, { useEffect, useState } from "react";
import AddBlogsModel from "./AddBlogsModel";
import axios from "axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import EditBlog from "./EditBlog";

const BlogPage = () => {
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEdit = (blogs) => {
    setSelectedBlog(blogs);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/getblog", {
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
    if (!window.confirm("Are you sure to delete blog")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });

      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error("Server error. Try again later");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <LoaderCircle size={50} className="animate-spin" />
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold">Blogs</h1>

      <button
        className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Add Blogs
      </button>

      {open && (
        <AddBlogsModel close={() => setOpen(false)} refresh={fetchBlogs} />
      )}

      {blogs.length === 0 ? (
        <p className="text-center mt-6 text-gray-500">No Blogs found</p>
      ) : (
        <div className="rounded-xl shadow overflow-x-auto mt-8">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Sr No</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Athour</th>
                <th className="p-3">Tag</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((e, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3 ">{idx + 1}</td>
                  <td className="p-3 ">{e.title}</td>
                  <td className="p-3 ">{e.description}</td>
                  <td className="p-3 ">{e.author}</td>
                  <td className="p-3 ">{e.tag}</td>
                  <td className="p-3 ">{e.duration}</td>
                  <td className="p-3 ">{formatDate(e.createAt)}</td>
                  <td className="p-3">
                    <div className="flex justify-center items-center">
                      <button
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteBlog(e.id)}
                      >
                        Delete{" "}
                      </button>{" "}
                      /{" "}
                      <button
                        className="text-blue-800 cursor-pointer"
                        onClick={() => handleEdit(e)}
                      >
                        Edit
                      </button>{" "}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedBlog && (
        <EditBlog blogs={selectedBlog} close={closeModal} setBlogs={setBlogs} />
      )}
    </div>
  );
};

export default BlogPage;
