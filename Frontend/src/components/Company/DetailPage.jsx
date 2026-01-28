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
    <div className="bg-[#F9FAFB] py-20 px-4">
      <h1 className="text-center font-bold text-lg md:text-[30px] mb-4">
        Why Choose DOT Council?
      </h1>
      <h2 className="text-center text-sm md:text-[22px]">
        We provide comprehensive, up-to-date DOT training that keeps your
        business compliant and your team confident.
      </h2>
      <div className="max-w-6xl mx-auto md:grid md:grid-cols-3 grid-cols-1 gap-8 mt-10 md:mt-18 ">
        {cardData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col  items-center text-center p-6 bg-[#f0f7ff] rounded-4xl border border-black mb-7"
          >
            <div className="w-16 h-16 bg-[#dee9ff] rounded-full flex items-center justify-center mb-6">
              {item.icon}
            </div>

            <h2 className="md:text-[22px] text-[18px] font-bold mb-4">
              {item.name}
            </h2>
            <p className="text-gray-600 leading-relaxed md:text-base text-[14px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
