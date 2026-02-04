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
    <>
      <div className="mt-5">
        <h1 className="text-center text-[30px] font-bold">
          Compliance Services
        </h1>
        <h3 className="text-center text-[20px] ">
          Beyond training, we offer services to keep your operations running
          smoothly.
        </h3>
      </div>
      <div className="mt-10 flex justify-center items-center gap-10 m-10 ">
        {data.map((e, idx) => (
          <div
            className="w-110 bg-[#F0F7FF] rounded-2xl hover:scale-110 transition-transform p-10 border-2 border-transparent hover:border-black"
            key={idx}
          >
            <h1 className="text-center font-bold text-[18px]">{e.title}</h1>
            <h2 className="my-4 text-[14px]  text-center">{e.description}</h2>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-2xl cursor-pointer">
              Comming Soon
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ComplianceServices;
