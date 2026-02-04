import React from "react";

const CompliancePage = () => {
  const data = [
    {
      image:
        "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769686090/HomeStory1_epup4p.png",
      title: "A fantastic learning experience!",
      description:
        "This course made complex DOT regulations simple to understand. I feel much more confident in my compliance duties now.",
      name: "Michael R.",
      stars: "🌟🌟🌟🌟🌟",
    },
    {
      image:
        "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769686117/HomeStory2_pqrf39.png",
      title: "Clear, concise, and practical.",
      description:
        "I appreciated how straightforward the lessons were. Everything was explained in plain language with real-world examples.",
      name: "Jessica L. ",
      stars: "🌟🌟🌟🌟🌟",
    },
    {
      image:
        "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769686158/HomeStory3_ir4thv.png",
      title: "Worth every minute!",
      description:
        "The course saved me hours of confusion. It guided me through every step of the supervisor responsibilities seamlessly.",
      name: "David P. ",
      stars: "🌟🌟🌟🌟🌟",
    },
    {
      image:
        "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769686164/HomeStory4_bfqmga.png",
      title: "Easy to follow and engaging.",
      description:
        "I actually enjoyed learning about compliance, which I didn’t think was possible. Great visuals and examples throughout.",
      name: "Sophia K.",
      stars: "🌟🌟🌟🌟🌟",
    },
  ];
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-[32px] font-bold">
          Compliance That Speaks for Itself
        </h1>
        <p className=" text-[20px] mt-2">
          Success stories from those who’ve walked the road to certification
          with DOT Council.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto m-12">
        {data.map((e, idx) => (
          <div
            key={idx}
            className="flex items-center gap-5 bg-[#D8E2E9] rounded-r-full px-6 py-6 "
          >
            <img
              src={e.image}
              alt={e.name}
              className="w-26 h-26 object-cover"
            />

            <div>
              <h3 className="font-bold text-[14px] mb-1">{e.title}</h3>
              <p className="text-[12px] text-gray-700 mb-3">{e.description}</p>

              <div className="flex items-center gap-2 text-[12px]">
                <span className="font-semibold">{e.name}</span>
                <span className="text-yellow-500">{e.stars}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CompliancePage;
