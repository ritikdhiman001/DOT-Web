import { useState, useEffect } from "react";
import axios from "axios";
import { X, Save, User } from "lucide-react";
import { toast } from "react-toastify";
import { apiBaseUrl } from "@/utils/common";

const EditUserModal = ({ user, close, refresh }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        companyName: user.companyName || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await axios.put(
        `${apiBaseUrl}/api/admin/updateUser/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        },
      );
      toast.success("User updated successfully!");
      refresh();
      close();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error("Failed to update user");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-100"
        onClick={close}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                DOT ID: {user.dotNumber}
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-800"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-800"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-800"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Company Name
              </label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Logistics Company Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50/50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={close}
            className="flex-1 order-2 sm:order-1 px-5 py-3 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="flex-1 order-1 sm:order-2 px-5 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isUpdating ? (
              "Updating..."
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
