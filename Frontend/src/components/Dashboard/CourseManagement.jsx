import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseTable from "./CourseTable";
import AddCourseModel from "./AddCourseModel";
import EditCourse from "./EditCourse";
import { Plus, BookOpen, RefreshCcw } from "lucide-react";
import { toast } from "react-toastify";

const CourseManagement = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      toast.error("Could not load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteCourse/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      });
      setCourses((prev) => prev.filter((course) => course.id !== id));
      toast.success("Course deleted successfully");
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("AdminToken");
        window.location.href = "/admin/login";
      } else {
        toast.error("Failed to delete course");
      }
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-400 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-100 hidden sm:block">
            <BookOpen className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Course Management
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Currently managing{" "}
              <span className="text-blue-600 font-bold">{courses.length}</span>{" "}
              active programs.
            </p>
          </div>
        </div>

        <div className="flex w-full sm:w-auto gap-2">
          <button
            onClick={fetchCourses}
            className="p-3 text-gray-500 hover:bg-gray-100 rounded-xl transition-all border border-gray-100"
            title="Refresh Data"
          >
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
          >
            <Plus size={20} />
            Add New Course
          </button>
        </div>
      </div>

      <div className="relative min-h-100">
        <CourseTable
          courses={courses}
          onDelete={deleteCourse}
          onEdit={handleEdit}
          loading={loading}
        />
      </div>

      {open && (
        <AddCourseModel close={() => setOpen(false)} refresh={fetchCourses} />
      )}

      {selectedCourse && (
        <EditCourse
          course={selectedCourse}
          close={closeModal}
          refresh={fetchCourses}
        />
      )}
    </div>
  );
};

export default CourseManagement;
