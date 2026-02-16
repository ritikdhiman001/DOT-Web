import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const token = localStorage.getItem("AdminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <main
          className={`flex-1 p-4 md:p-8 mt-16 lg:mt-0 lg:ml-64 transition-all duration-300 ease-in-out`}
        >
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-2 md:p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
