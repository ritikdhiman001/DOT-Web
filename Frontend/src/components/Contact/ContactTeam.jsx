import React from "react";
import { Link } from "react-router-dom";
import { CircleArrowRight } from "lucide-react";

const ContactTeam = () => {
  return (
    <div className="bg-blue-800 text-white text-center md:p-7 p-5">
      <div className="p-5">
        <h1 className="md:text-4xl text-[22px] font-bold">Contact Team</h1>
        <h3 className="md:text-2xl text-[16px]">
          Join thousands of transportation professionals who trust DOT Council
          for their compliance training needs.
        </h3>

        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 mt-5 max-w-6xl mx-auto">
          <Link
            className="border-2 md:px-10 py-4 px-4 rounded-2xl md:text-2xl text-sm font-bold cursor-pointer flex justify-center gap-4 items-center"
            to="/register"
          >
            <span className="whitespace-nowrap">Start Your Training Today</span>
            <CircleArrowRight className="h-6 w-6 md:h-10 md:w-10 shrink-0" />
          </Link>

          <Link
            to="/contact"
            className="border-2 border-white md:px-10 py-4 px-4 rounded-2xl md:text-2xl text-sm font-bold bg-white text-black cursor-pointer flex justify-center items-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactTeam;
