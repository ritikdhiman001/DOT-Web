import { LoaderCircle } from "lucide-react";

const CourseTable = ({ courses, onDelete, onEdit, loading }) => {
  // 1️⃣ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <LoaderCircle size={50} className="animate-spin" />
      </div>
    );
  }

  // 2️⃣ Empty state
  if (!courses || courses.length === 0) {
    return <p className="text-center text-gray-500 py-6">No courses found</p>;
  }

  // 3️⃣ Data state
  return (
    <div className="rounded-xl shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Sr No</th>
            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Type</th>
            <th className="p-3">Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>

              <td className="p-3">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-12 w-16 object-cover rounded"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              </td>

              <td className="p-3 font-medium">{course.title}</td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    course.type === "Free"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {course.type}
                </span>
              </td>

              <td className="p-3 font-semibold">
                {course.type === "Free" ? "Free" : `$${course.price}`}
              </td>

              <td className="p-3">
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => onDelete(course.id)}
                >
                  Delete
                </button>{" "}
                /{" "}
                <button
                  className="text-blue-700 cursor-pointer"
                  onClick={() => onEdit(course)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
