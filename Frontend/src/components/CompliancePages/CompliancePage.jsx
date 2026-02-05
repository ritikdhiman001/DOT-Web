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
      stars: "⭐⭐⭐⭐⭐",
    },
    {
      image:
        "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769686117/HomeStory2_pqrf39.png",
      title: "Clear, concise, and practical.",
      description:
        "I appreciated how straightforward the lessons were. Everything was explained in plain language with real-world examples.",
      name: "Jessica L.",
      stars: "⭐⭐⭐⭐⭐",
    },
    {
      image:
        "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769686158/HomeStory3_ir4thv.png",
      title: "Worth every minute!",
      description:
        "The course saved me hours of confusion. It guided me through every step of the supervisor responsibilities seamlessly.",
      name: "David P.",
      stars: "⭐⭐⭐⭐⭐",
    },
    {
      image:
        "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769686164/HomeStory4_bfqmga.png",
      title: "Easy to follow and engaging.",
      description:
        "I actually enjoyed learning about compliance, which I didn’t think was possible. Great visuals and examples throughout.",
      name: "Sophia K.",
      stars: "⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="text-center px-6 mb-10">
        <h1 className="text-2xl md:text-[32px] font-bold text-gray-900">
          Compliance That Speaks for Itself
        </h1>
        <p className="text-sm md:text-[20px] text-gray-600 max-w-4xl mx-auto mt-2">
          Success stories from those who’ve walked the road to certification
          with DOT Council.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 md:px-0">
        {data.map((e, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center gap-6 bg-[#D8E2E9] rounded-2xl sm:rounded-r-full p-6"
          >
            <div className="shrink-0">
              <img
                src={e.image}
                alt={e.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-sm"
              />
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-bold text-[15px] md:text-lg mb-1 ">
                {e.title}
              </h3>
              <p className="text-[13px] md:text-sm  mb-3 leading-relaxed">
                {e.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="font-bold text-sm ">{e.name}</span>
                <span className="text-xs md:text-sm tracking-widest">
                  {e.stars}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompliancePage;
