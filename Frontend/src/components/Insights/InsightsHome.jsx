import React from "react";
import { User } from "lucide-react";
import { Calendar } from "lucide-react";
import NewsUpdates from "./NewsUpdates";

const InsightsHome = () => {
  return (
    <>
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769752806/FMCSAHero_pnovtb.png"
          alt=""
          className="w-screen h-screen object-cover"
        />
      </div>
      <div className="absolute top-120 text-[3.5rem] left-[6%] ">
        <h1 className="text-blue-800 font-bold mb-6">
          FMCSA <span className="text-white">Updates</span>
        </h1>
        <p className="text-white text-[20px] max-w-3xl">
          Your source for the latest news, rule changes, and safety advisories
          from the Federal Motor Carrier Safety Administration.
        </p>
      </div>
      <div className="max-w-2xl mx-auto p-6 m-7 shadow-md rounded-md ">
        <div className="flex justify-between items-center text-[15px] ">
          <p className="px-4 text-white bg-blue-800 rounded-2xl py-1">
            Rulemaking
          </p>
          <p className="px-4 text-white bg-red-600 rounded-2xl py-1">
            Featured
          </p>
        </div>
        <div>
          <h1 className="text-[19px] font-bold mt-4">
            FMCSA Proposes New Speed Limiter Rule for Commercial Vehicles
          </h1>
          <p className="text-[17px] max-w-3xl mt-3 text-gray-600">
            The FMCSA has issued a notice of proposed rulemaking that would
            require most commercial motor vehicles to be equipped with an
            electronic speed limiter. Discover the details and what it means for
            your fleet.
          </p>
          <div className="flex justify-between items-center mt-5 text-gray-500 text-[15px]">
            <p className="flex justify-center items-center gap-1 ">
              {" "}
              <User size={15} />
              FMCSA News Desk
            </p>
            <p className="flex justify-center items-center gap-1">
              {" "}
              <Calendar size={15} /> 6/18/2025
            </p>
            <p className="flex justify-center items-center gap-1">6 min read</p>
          </div>
        </div>
      </div>
      <NewsUpdates />
    </>
  );
};

export default InsightsHome;
