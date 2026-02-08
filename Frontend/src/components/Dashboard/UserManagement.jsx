import axios from "axios";
import { LoaderCircle, Trash2, Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import { apiBaseUrl } from "@/utils/common";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      setUsers(res.data.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        console.error("Failed to fetch users", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    try {
      await axios.delete(`${apiBaseUrl}/api/admin/userDelete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex h-64 justify-center items-center">
        <LoaderCircle size={50} className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="p-2 md:p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          User Management
        </h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Total: {users.length}
        </span>
      </div>

      <div className="hidden md:block overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  DOT ID
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Company
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-sm font-mono font-medium text-blue-600">
                    {user.dotNumber}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {user.firstName} {user.lastName}
                    <div className="text-xs text-gray-400 mt-0.5">
                      {user.phone}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{user.email}</td>
                  <td className="p-4 text-sm text-gray-700">
                    {user.companyName || "—"}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setOpenEdit(true);
                          setSelectedUser(user);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit User"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  DOT: {user.dotNumber}
                </span>
                <h3 className="font-bold text-gray-800">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setSelectedUser(user);
                  }}
                  className="p-2 text-blue-600 bg-blue-50 rounded-md"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="p-2 text-red-600 bg-red-50 rounded-md"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-medium">Company:</span>{" "}
                {user.companyName || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {openEdit && selectedUser && (
        <EditUserModal
          user={selectedUser}
          close={() => setOpenEdit(false)}
          refresh={fetchUsers}
        />
      )}
    </div>
  );
};

export default UserManagement;
