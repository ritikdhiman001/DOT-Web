import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
const MandatoryCourse = () => {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data.data);
      } catch (error) {
        console.error("Faild to load courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="bg-[#F0F7FF] py-16">
      <h1 className="text-center text-black text-[30px] font-bold">
        Mandatory Trainings
      </h1>
      <h3 className="text-center text-[20px] ">
        Get certified in essential DOT compliance areas
      </h3>
      <section className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LoaderCircle size={50} className="animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border-2 border-gray-400 hover:border-gray-600 hover:scale-110 transition-all"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-50 w-full object-cover rounded-t-2xl"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/400x200")
                  }
                />

                <div className="p-5">
                  <h3 className="font-semibold text-lg">{course.title}</h3>

                  <p className="text-sm text-gray-500 mt-2 h-25">
                    {course.description}
                  </p>

                  <div className="flex flex-col mt-4">
                    <h2 className="text-2xl font-bold">
                      {course.type === "Free" ? "Free" : `$${course.price}`}
                    </h2>

                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MandatoryCourse;
