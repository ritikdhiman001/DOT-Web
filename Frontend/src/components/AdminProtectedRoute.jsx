import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminProtectedRoute = () => {
  const token = localStorage.getItem("AdminToken");
  const role = localStorage.getItem("role");
  const location = useLocation();
  if (!token || role !== "admin") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
