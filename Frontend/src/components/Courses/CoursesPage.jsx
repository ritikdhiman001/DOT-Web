import { useState } from "react";
import { Search } from "lucide-react";
import ContactTeam from "../Contact/ContactTeam";
import MandatoryCourse from "./MandatoryCourse";

const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] md:h-screen">
        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769586421/CoursesHeroBG_laijac.png"
          alt="Courses Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex items-center justify-center py-20 fadeInUp-animation">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-6xl font-bold text-white mt-10">
              <span className="text-blue-700">DOT Training</span> Courses
            </h1>

            <p className="mt-4 max-w-2xl text-white text-sm md:text-xl leading-relaxed">
              Comprehensive training programs designed to keep your business
              compliant and your team confident in DOT regulations.
            </p>

            <div className="mt-10 flex items-center w-full max-w-md md:max-w-2xl bg-white rounded-full shadow-lg overflow-hidden">
              <div className="pl-4 text-gray-400">
                <Search className="w-5 h-5" />
              </div>

              <input
                type="text"
                placeholder="Search courses..."
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
                  <option value="FREE">Free</option>
                  <option value="PAID">Paid</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MandatoryCourse
        title="Popular Courses"
        search={search}
        filter={filter}
      />

      <ContactTeam />
    </div>
  );
};

export default CoursesPage;
