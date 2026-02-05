import React from "react";

const ComplianceServices = () => {
  const data = [
    {
      title: "UCR Filing",
      description:
        "The Unified Carrier Registration (UCR) is an annual federal requirement for most interstate motor carriers. We'll handle the paperwork to keep you compliant and on the road.",
    },
    {
      title: "Biennial Update (MCS-150)",
      description:
        "The FMCSA requires all regulated entities to update their information every two years. Let us manage your MCS-150 form to ensure your DOT number remains active.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="px-6 mb-10 text-center">
        <h1 className="text-xl font-bold text-gray-900 md:text-3xl">
          Compliance Services
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-lg max-w-2xl mx-auto">
          Beyond training, we offer services to keep your operations running
          smoothly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 mx-auto lg:grid-cols-2 max-w-6xl">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-8 bg-[#F0F7FF] rounded-3xl border-2 border-transparent hover:border-black transition-all duration-300 md:hover:scale-[1.02] shadow-sm"
          >
            <div className="text-center">
              <h2 className="text-lg font-bold md:text-2xl mb-4">
                {item.title}
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-gray-700 md:text-base">
                {item.description}
              </p>
            </div>

            <button className="w-full bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold opacity-80 cursor-not-allowed text-sm md:text-base">
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComplianceServices;
