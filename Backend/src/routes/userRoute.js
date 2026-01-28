import express from "express";
import { registerUser } from "../controller/user/registerUser.js";
import { loginUser } from "../controller/user/loginUser.js";
import { contactUser } from "../controller/user/contactController.js";
import {
  deleteUser,
  editUser,
  getAllUsers,
} from "../controller/admin/adminUserController.js";
import { getDashboardStats } from "../controller/admin/adminDashboardController.js";
import {
  addCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "../controller/admin/courseController.js";

import { verifyToken } from "../middleware/verifyToken.js";


const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/contact", verifyToken, contactUser);

routes.get("/admin/users", getAllUsers);
routes.get("/admin/dashboard-stats", getDashboardStats);
routes.post("/admin/courses", addCourse);
routes.get("/courses", getCourse);
routes.delete("/admin/userDelete/:id", deleteUser);
routes.put("/admin/updateUser/:id", editUser);
routes.delete("/admin/deleteCourse/:id", deleteCourse);
routes.put("/admin/updateCourse/:id", updateCourse);
export default routes;
