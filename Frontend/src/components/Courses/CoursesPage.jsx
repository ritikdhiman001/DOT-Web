import { useState, useEffect } from "react";
import axios from "axios";
import { Search, LoaderCircle } from "lucide-react";
import ContactTeam from "../Contact/ContactTeam";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/utils/common";

const CoursesPage = () => {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
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

  const isInCart = (courseId) => {
    return cart.some((item) => item.id === courseId);
  };
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" ? true : course.type === filter;
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] md:h-screen">
        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769586421/CoursesHeroBG_laijac.png"
          alt="img"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex items-center justify-center py-20">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-6xl font-bold text-white mt-10">
              <span className="text-blue-700">DOT Training</span> Courses
            </h1>
            <p className="mt-4 max-w-2xl text-white text-sm md:text-xl leading-relaxed">
              Comprehensive training programs designed to keep your business
              compliant and your team confident in DOT regulations.
            </p>
            <div className="mt-10 flex flex-row items-center w-full max-w-md md:max-w-2xl bg-white rounded-full shadow-lg overflow-hidden">
              <div className="pl-4 text-gray-400">
                <Search className="w-5 h-5" />
              </div>

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-3 md:px-4 md:py-4 outline-none text-sm md:text-base"
              />

              <div className="border-l border-gray-200 px-2 md:px-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="outline-none bg-transparent text-sm md:text-base font-medium cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Popular Courses
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoaderCircle size={50} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const itemExists = isInCart(course.id);
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md md:hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col"
                >
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

                      <button
                        onClick={() => {
                          if (itemExists) {
                            navigate("/cart");
                          } else {
                            addToCart(course);
                          }
                        }}
                        className={`w-full bg-blue-800 text-white py-2.5 rounded-xl active:scale-95 transition-all font-bold text-sm md:text-base cursor-pointer shadow-lg ${
                          itemExists
                            ? "bg-green-600 hover:bg-green-800 text-white"
                            : "bg-blue-800 hover:bg-blue-900 text-white"
                        } `}
                      >
                        {itemExists ? "Go to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <ContactTeam />
    </div>
  );
};

export default CoursesPage;
