import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Upload } from "lucide-react";
import { useRef } from "react";

const AddCourseModal = ({ close, refresh }) => {
  const fileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "Free",
  });

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

      setImageUrl(result.secure_url); // ✅ save URL
      setPreview(result.secure_url); // ✅ preview
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image");
      return;
    }

    await axios.post("http://localhost:5000/api/admin/courses", {
      ...form,
      image: imageUrl,
      price: form.type === "Free" ? 0 : form.price,
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Course</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Course Title"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <select
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>Free</option>
            <option>Paid</option>
          </select>

          <div className="flex justify-center items-center gap-2">
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 object-cover rounded border"
              />
            )}

            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100"
            >
              <Upload size={18} Upload Image />
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
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

export default AddCourseModal;
