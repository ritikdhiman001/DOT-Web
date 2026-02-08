import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { apiBaseUrl } from "@/utils/common";

const MandatoryCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/courses`);
        setCourses(res.data.data);
      } catch (error) {
        console.error("Failed to load courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-[#F0F7FF] py-10 md:py-16">
      <div className="text-center px-4 mb-6 md:mb-10">
        <h1 className="text-black text-xl md:text-3xl font-bold leading-tight">
          Mandatory Trainings
        </h1>
        <h3 className="text-gray-600 text-sm md:text-[22px] mt-2">
          Get certified in essential DOT compliance areas
        </h3>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <LoaderCircle size={50} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md md:hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Aspect Ratio fix */}
                <div className="relative h-48 md:h-56 w-full">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/400x200")
                    }
                  />
                </div>

                <div className="p-4 md:p-6 flex flex-col grow">
                  <h3 className="font-bold text-base md:text-xl text-gray-800 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 mt-2 text-xs md:text-sm line-clamp-3 grow">
                    {course.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Price
                      </span>
                      <h2 className="text-lg md:text-2xl font-black">
                        {course.type === "Free" ? "Free" : `$${course.price}`}
                      </h2>
                    </div>

                    <button className="w-full bg-blue-800 text-white py-2.5 rounded-xl active:scale-95 transition-all font-bold text-sm md:text-base cursor-pointer shadow-lg shadow-blue-200">
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
