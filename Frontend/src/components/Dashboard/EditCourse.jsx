import axios from "axios";
import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";

const EditCourse = ({ course, close, setCourses }) => {
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: course.title || "",
    type: course.type || "",
    price: course.price || "",
  });

  const [imageUrl, setImageUrl] = useState(course.image || "");
  const [preview, setPreview] = useState(course.image || "");

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
        `http://localhost:5000/api/admin/updateCourse/${course.id}`,
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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-105">
        <h3 className="text-xl font-bold mb-4 text-center">Edit Course</h3>

        <label className="block mb-1">Image</label>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="h-32 w-full object-cover rounded mb-2 border"
          />
        )}

        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden "
        />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="px-4 py-2 border rounded mb-4 hover:bg-gray-100"
          >
            <Upload size={18} />
          </button>
        </div>

        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <label>Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select Type</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          disabled={formData.type === "Free"}
          className={`w-full mb-4 p-2 border rounded ${
            formData.type === "Free" ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={close}
            className="px-4 py-2 border rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
