import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PurchasesCourse = () => {
  const { purchasedCourses } = useAuth();

  const courses = purchasedCourses?.map((order) => order.course) || [];

  if (courses.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-6">
        <div className="text-7xl md:text-9xl mb-6 animate-bounce">🎓</div>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 text-center">
          No Courses Yet
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm text-sm md:text-base">
          Looks like you haven't started your learning journey yet. Explore our
          catalog to find the perfect course for you.
        </p>
        <Link
          to="/courses"
          className="bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-800 transition-all shadow-xl active:scale-95 text-center"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <header className="mb-10 md:mb-12 text-center md:text-left mt-10">
        <h1 className="text-3xl md:text-3xl lg:text-4xl text-center font-extrabold text-gray-900">
          My Courses
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group flex flex-col bg-white rounded-3xl border border-gray-100 hover:border-black hover:scale-102 transition-transform overflow-hidden"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col grow">
              <h3 className="font-bold text-xl text-gray-800 line-clamp-2 leading-tight min-h-14">
                {course.title}
              </h3>

              <p className="text-gray-500 text-sm mt-3 line-clamp-2 grow">
                {course.description}
              </p>

              <Link
                to={`/course/${course.id}`}
                className="mt-6 block text-center bg-blue-700 text-white py-3 rounded-2xl font-bold hover:bg-blue-800 transition-colors"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasesCourse;
