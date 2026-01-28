import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CourseTable from "./CourseTable";
import AddCourseModel from "./AddCourseModel";
import EditCourse from "./EditCourse";

const CourseManagement = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEdit = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data.data);
    } catch (error) {
      console.error("Faild to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure to delete course")) return;
    await axios.delete(`http://localhost:5000/api/admin/deleteCourse/${id}`);

    setCourses((prev) => prev.filter((course) => course.id !== id));
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center">Courses</h1>
      <div className="mb-6">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          {" "}
          Add Course
        </button>
      </div>
      <CourseTable
        courses={courses}
        onDelete={deleteCourse}
        onEdit={handleEdit}
        loading={loading}
      />

      {open && (
        <AddCourseModel close={() => setOpen(false)} refresh={fetchCourses} />
      )}

      {selectedCourse && (
        <EditCourse
          course={selectedCourse}
          close={closeModal}
          setCourses={setCourses}
        />
      )}
    </div>
  );
};

export default CourseManagement;
