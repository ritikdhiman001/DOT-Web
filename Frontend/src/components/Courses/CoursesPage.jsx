import { useState } from "react";
import { Search, Filter } from "lucide-react";
import ContactTeam from "../Contact/ContactTeam";
import Footer from "../Navbar-Footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
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

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" ? true : course.type === filter;

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen">
        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769586421/CoursesHeroBG_laijac.png"
          alt="img"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="pt-30">
            <h1 className="text-6xl font-bold text-white">
              <span className="text-blue-800 text-6xl">DOT Training</span>
              Courses
            </h1>
            <p className="mt-4 max-w-3xl text-white leading-6 text-[20px]">
              Comprehensive training programs designed to keep your business
              compliant and your team confident in DOT regulations.
            </p>

            <div className="mt-32 flex items-center w-full max-w-3xl bg-white rounded-full shadow-lg overflow-hidden">
              <div className="flex items-center px-4 text-gray-400">
                <Search className="w-5 h-5" />
              </div>

              <input
                type="text"
                placeholder="Search Courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 outline-none"
              />

              <div className="flex items-center gap-2 px-5 py-3 border-l">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  name="courses"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="outline-none"
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

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Popular Courses</h2>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LoaderCircle size={50} className="animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border shadow-sm hover:shadow-md transition"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded-t-2xl"
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
      <ContactTeam />
      <Footer />
    </div>
  );
};

export default CoursesPage;
