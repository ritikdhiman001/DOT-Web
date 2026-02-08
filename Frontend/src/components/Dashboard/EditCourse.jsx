import axios from "axios";
import React, { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { apiBaseUrl } from "@/utils/common";

const EditCourse = ({ course, close, setCourses }) => {
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: course.title || "",
    type: course.type || "",
    price: course.price || "",
  });

  const [imageUrl, setImageUrl] = useState(course.image || "");
  const [preview, setPreview] = useState(course.image || "");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && value === "Free" ? { price: 0 } : {}),
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "DOT_Images");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpqggtyjw/image/upload",
        {
          method: "POST",
          body: data,
        },
      );
      const result = await res.json();
      setImageUrl(result.secure_url);
      setPreview(result.secure_url);
    } catch (error) {
      console.error("Cloudinary upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        title: formData.title,
        type: formData.type,
        price: formData.price,
        image: imageUrl,
      };

      const res = await axios.put(
        `${apiBaseUrl}/api/admin/updateCourse/${course.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        },
      );

      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? res.data.data : c)),
      );
      close();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        console.error("Failed to update course", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-110 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="absolute inset-0" onClick={close}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-xl font-bold text-gray-800">Edit Course</h3>
          <button
            onClick={close}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[85vh] overflow-y-auto">
          <div className="mb-6 text-center">
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Course Cover Image
            </label>
            <div
              onClick={() => fileRef.current.click()}
              className="relative group cursor-pointer border-2 border-dashed border-gray-300 rounded-xl overflow-hidden hover:border-blue-500 transition-all"
            >
              {preview ? (
                <div className="relative h-40 w-full">
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="text-white" size={32} />
                  </div>
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                  <ImageIcon size={48} strokeWidth={1} />
                  <span className="text-sm mt-2">Click to upload image</span>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Course Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                >
                  <option value="">Select Type</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={formData.type === "Free"}
                  className={`w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    formData.type === "Free"
                      ? "bg-gray-100 cursor-not-allowed text-gray-400"
                      : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={close}
            className="w-full sm:w-auto px-6 py-2.5 text-gray-600 font-semibold hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={uploading}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:bg-blue-400 cursor-pointer"
          >
            Update Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
