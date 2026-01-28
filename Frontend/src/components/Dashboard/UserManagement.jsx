import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import EditUserModal from "./EditUserModal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/userDelete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle size={50} className="animate-spin " />
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">User Management</h2>
      <div className="#F3F4F6 overflow-x-auto rounded shadow">
        <table className="w-full text-center">
          <thead className="">
            <tr>
              <th className="p-3 ">DOT ID</th>
              <th className="p-3 ">First Name</th>
              <th className="p-3 ">Last Name</th>
              <th className="p-3 ">Phone Number</th>
              <th className="p-3 ">Email</th>
              <th className="p-3 ">Company Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3 "> {user.dotNumber}</td>
                <td className="p-3 ">{user.firstName}</td>
                <td className="p-3 ">{user.lastName}</td>
                <td className="p-3 ">{user.phone}</td>
                <td className="p-3 ">{user.email}</td>
                <td className="p-3 ">{user.companyName}</td>
                <td>
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>{" "}
                  /{" "}
                  <button
                    className="text-blue-700 cursor-pointer"
                    onClick={() => {
                      setOpenEdit(true);
                      setSelectedUser(user);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openEdit && (
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
