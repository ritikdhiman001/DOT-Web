import { useState, useRef } from "react";
import axios from "axios";
import { X, Upload, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const AddCourseModal = ({ close, refresh }) => {
  const fileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "Free",
  });

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
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) return toast.warning("Please upload a course image");

    setSubmitting(true);
    try {
      await axios.post(
        "http://localhost:5000/api/admin/courses",
        {
          ...form,
          image: imageUrl,
          price: form.type === "Free" ? 0 : form.price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        },
      );
      toast.success("Course added successfully!");
      refresh();
      close();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error("Failed to save course");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4">
      <div className="absolute inset-0" onClick={close}></div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Add New Course</h2>
          <button
            onClick={close}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
        >
          <div
            onClick={() => fileRef.current.click()}
            className="group relative h-25 w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all overflow-hidden"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="bg-gray-100 p-3 rounded-full inline-block mb-2 group-hover:bg-blue-100 transition-colors">
                  <Upload
                    className="text-gray-500 group-hover:text-blue-600"
                    size={24}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Click to upload cover image
                </p>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={32} />
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

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Course Title
            </label>
            <input
              required
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              required
              rows="3"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Type
              </label>
              <select
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                disabled={form.type === "Free"}
                placeholder="0.00"
                className={`w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${form.type === "Free" ? "bg-gray-100 cursor-not-allowed" : ""}`}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={close}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={uploading || submitting}
              className="flex-1 bg-blue-700 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-blue-800 disabled:bg-blue-400 transition-all flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={18} className="animate-spin" />}
              Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
