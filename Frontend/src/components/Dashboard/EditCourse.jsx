import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";

const EditCourse = ({ course, close, setCourses }) => {
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: course.title || "",
    type: course.type || "",
    price: course.price || "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // load existing image
  useEffect(() => {
    if (course.image) {
      setPreview(`http://localhost:5000/uploads/courses/${course.image}`);
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && value === "Free" ? { price: 0 } : {}),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("type", formData.type);
      data.append("price", formData.price);

      if (image) {
        data.append("image", image);
      }

      const res = await axios.put(
        `http://localhost:5000/api/admin/updateCourse/${course.id}`,
        data,
      );

      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? res.data.data : c)),
      );

      close();
    } catch (error) {
      console.error(error);
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
          <button onClick={close} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
