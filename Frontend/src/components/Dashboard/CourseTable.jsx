import { LoaderCircle, Pencil, Trash2 } from "lucide-react";

const CourseTable = ({ courses, onDelete, onEdit, loading }) => {
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
                Course
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
                    <span className="font-semibold text-gray-800 line-clamp-1">
                      {course.title}
                    </span>
                  </div>
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
      <div className="md:hidden flex flex-col gap-4">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex gap-4 mb-4">
              <img
                src={course.image}
                alt={course.title}
                className="w-24 h-16 object-cover rounded-lg border"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-400 font-mono">
                    #{index + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      course.type === "Free"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {course.type}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-blue-600 font-bold mt-1">
                  {course.type === "Free" ? "Free" : `$${course.price}`}
                </p>
              </div>
            </div>

            <div className="flex gap-2 border-t pt-3">
              <button
                onClick={() => onEdit(course)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold text-sm cursor-pointer"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => onDelete(course.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-500 rounded-lg font-semibold text-sm cursor-pointer"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseTable;
