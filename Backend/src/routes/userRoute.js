import express from "express";
import { registerUser } from "../controller/user/registerUser.js";
import { loginUser } from "../controller/user/loginUser.js";
import { contactUser } from "../controller/user/contactController.js";
import {
  deleteUser,
  editUser,
  getAllUsers,
} from "../controller/admin/adminUserController.js";
import {
  adminlogin,
  getDashboardStats,
} from "../controller/admin/adminDashboardController.js";
import {
  addCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "../controller/admin/courseController.js";
import { adminTokenVerify, verifyToken } from "../middleware/verifyToken.js";
import {
  addBlog,
  deleteBlog,
  getBlog,
  updateBlog,
} from "../controller/admin/blogController.js";
const routes = express.Router();
routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/contact", verifyToken, contactUser);
routes.get("/admin/users", adminTokenVerify, getAllUsers);
routes.get("/admin/dashboard-stats", adminTokenVerify, getDashboardStats);
routes.post("/admin/courses", adminTokenVerify, addCourse);
routes.get("/courses", getCourse);
routes.delete("/admin/userDelete/:id", adminTokenVerify, deleteUser);
routes.put("/admin/updateUser/:id", adminTokenVerify, editUser);
routes.delete("/admin/deleteCourse/:id", adminTokenVerify, deleteCourse);
routes.put("/admin/updateCourse/:id", adminTokenVerify, updateCourse);
routes.post("/admin/addblog", adminTokenVerify, addBlog);
routes.get("/admin/getblog", getBlog);
routes.delete("/admin/deleteBlog/:id", adminTokenVerify, deleteBlog);
routes.put("/admin/updateBlog/:id", adminTokenVerify, updateBlog);
routes.post("/admin/login", adminlogin);
export default routes;
