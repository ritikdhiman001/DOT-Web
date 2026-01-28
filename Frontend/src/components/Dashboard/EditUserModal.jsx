import { useState, useEffect } from "react";
import axios from "axios";

const EditUserModal = ({ user, close, refresh }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        companyName: user.companyName,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/updateUser/${user.id}`,
        formData,
      );
      refresh();
      close();
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-100">
        <h3 className="text-xl font-bold mb-4 text-center">Edit User</h3>
        <label className="">First Name</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <label className="">Last Name</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <label className="">Phone Number</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full mb-3 p-2 border rounded"
        />
        <label className="">Company Name</label>

        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company"
          className="w-full mb-3 p-2 border rounded"
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

export default EditUserModal;
