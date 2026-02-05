import React from "react";
import { User, Calendar } from "lucide-react";
import NewsUpdates from "./NewsUpdates";

const InsightsHome = () => {
  return (
    <>
      <div className="relative min-h-[50vh] md:h-screen w-full flex flex-col justify-center overflow-hidden">
        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769752806/FMCSAHero_pnovtb.png"
          alt="FMCSA Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-[6%] pt-24 pb-16 md:pt-0">
          <h1 className="text-3xl md:text-[3.5rem] font-bold mb-4 leading-tight">
            <span className="text-blue-500 md:text-blue-800">FMCSA</span>{" "}
            <span className="text-white">Updates</span>
          </h1>
          <p className="text-white text-base md:text-[20px] max-w-2xl leading-relaxed">
            Your source for the latest news, rule changes, and safety advisories
            from the Federal Motor Carrier Safety Administration.
          </p>
        </div>
      </div>

      <div className="px-4 md:px-0 -mt-8 md:-mt-20 relative z-20">
        <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white border border-gray-200 shadow-2xl rounded-2xl">
          <div className="flex justify-between items-center text-[11px] md:text-[14px]">
            <p className="px-3 md:px-5 text-white bg-blue-800 rounded-full py-1 font-bold">
              Rulemaking
            </p>
            <p className="px-3 md:px-5 text-white bg-red-600 rounded-full py-1 font-bold">
              Featured
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              FMCSA Proposes New Speed Limiter Rule for Commercial Vehicles
            </h2>
            <p className="text-sm md:text-lg mt-4 text-gray-600 leading-relaxed">
              The FMCSA has issued a notice of proposed rulemaking that would
              require most commercial motor vehicles to be equipped with an
              electronic speed limiter.
            </p>

            <div className="flex flex-wrap justify-between items-center mt-6 pt-6 border-t border-gray-100 text-gray-500 text-[12px] md:text-[15px] gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-800" />
                <span className="font-medium">FMCSA News Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <span>6/18/2025</span>
              </div>
              <div className="font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg">
                6 min read
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <NewsUpdates />
      </div>
    </>
  );
};

export default InsightsHome;
