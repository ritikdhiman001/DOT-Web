import { apiBaseUrl } from "@/utils/common";
import axios from "axios";
import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const CourseTable = ({ courses, onDelete, onEdit, loading }) => {
  const [courseUser, setCourseUser] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const fetchCourseUser = async (courseId) => {
    try {
      const res = await axios.get(
        `${apiBaseUrl}/api/admin/getCoursePurchases/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")} `,
          },
        },
      );
      setCourseUser(res.data.data);
      setOpenModel(true);
    } catch (error) {
      console.error("Failed to fetch course users", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoaderCircle size={50} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed">
        <p className="text-gray-500">No courses found</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="hidden md:block overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Sr No
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Image
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Title
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Type
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Price
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-12 w-20 object-cover rounded-md shadow-sm border"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      }
                    />
                  </div>
                </td>
                <td
                  className="text-[16px] font-medium hover:underline cursor-pointer"
                  onClick={() => fetchCourseUser(course.id)}
                >
                  {course.title}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      course.type === "Free"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {course.type}
                  </span>
                </td>
                <td className="p-4 font-bold text-gray-900">
                  {course.type === "Free" ? "Free" : `$${course.price}`}
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(course)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(course.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-all"
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
      <div className="md:hidden flex flex-col gap-4 p-2">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex gap-4">
                {/* Image with fixed aspect ratio to prevent layout shift */}
                <div className="relative w-24 h-20 shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-xl border border-gray-100"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-gray-400 font-mono tracking-tighter">
                      ID: {index + 1}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        course.type === "Free"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {course.type}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug"
                    onClick={() => fetchCourseUser(course.id)}
                  >
                    {course.title}
                  </h3>

                  <p className="text-blue-600 font-extrabold text-base mt-1">
                    {course.type === "Free" ? "Free" : `$${course.price}`}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 pt-3 border-t border-gray-50">
                <button
                  onClick={() => onEdit(course)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm active:scale-95 transition-transform cursor-pointer shadow-sm shadow-blue-200"
                >
                  <Pencil size={16} /> <span>Edit</span>
                </button>

                <button
                  onClick={() => onDelete(course.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-sm active:scale-95 transition-transform cursor-pointer"
                >
                  <Trash2 size={16} /> <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openModel && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-150 max-h-[80vh] overflow-y-auto rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">
              {" "}
              Users Who Purchased This Course
            </h3>
            {courseUser.length === 0 ? (
              <p className="text-gray-500">No Purchased By Any User </p>
            ) : (
              courseUser.map((purchase, idx) => (
                <div key={idx} className="border-b py-3">
                  <h4 className="font-semibold">
                    {purchase.user.firstName} {purchase.user.lastName}
                  </h4>
                  <p className="text-sm text-gray-500">{purchase.user.email}</p>
                  <p className="text-xs text-gray-400"> ₹{purchase.amount}</p>
                </div>
              ))
            )}
            <div className="flex justify-center">
              <button
                onClick={() => setOpenModel(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTable;
