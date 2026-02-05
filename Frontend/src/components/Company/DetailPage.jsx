import React from "react";
import { LuClock4, LuShieldCheck, LuUsers } from "react-icons/lu";

const DetailPage = () => {
  const cardData = [
    {
      id: 1,
      icon: <LuClock4 size={28} className="text-blue-600" />,
      name: "Flexible Learning",
      description:
        "Study at your own pace with 24/7 access to course materials.",
    },
    {
      id: 2,
      icon: <LuShieldCheck size={28} className="text-blue-600" />,
      name: "Instant Certificates",
      description:
        "Download your completion certificates immediately after finishing.",
    },
    {
      id: 3,
      icon: <LuUsers size={28} className="text-blue-600" />,
      name: "Expert Instructors",
      description:
        "Learn from industry professionals with years of compliance experience.",
    },
  ];

  return (
    <div className="bg-[#F9FAFB] py-12 px-6">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="font-bold text-2xl md:text-4xl mb-4 text-gray-900">
          Why Choose DOT Council?
        </h1>
        <p className="text-gray-600 text-sm md:text-xl leading-relaxed">
          We provide comprehensive, up-to-date DOT training that keeps your
          business compliant and your team confident.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border hover:border-gray-800 shadow-sm hover:shadow-md md:hover:scale-105 transition-all duration-300 "
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              {item.icon}
            </div>

            <h2 className="text-lg md:text-2xl font-bold mb-3 text-gray-800">
              {item.name}
            </h2>

            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
