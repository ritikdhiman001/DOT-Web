import React from "react";
import { Link } from "react-router-dom";
import { CircleArrowRight } from "lucide-react";

const ContactTeam = () => {
  return (
    <div className="bg-blue-800 text-white text-center ">
      <div className="p-5">
        <h1 className="text-4xl font-bold"> Contact Team</h1>
        <h3 className="text-2xl">
          Join thousands of transportation professionals who trust DOT Council
          for their compliance training needs.
        </h3>
        <div className="gap-20 flex justify-center mt-5 ">
          <Link
            className="border-2 px-15 py-5 rounded-2xl text-2xl font-bold cursor-pointer flex justify-center gap-6 items-center"
            to="/register"
          >
            Start Your Training Today
            <CircleArrowRight size={40} />
          </Link>
          <Link to="/contact" className="border-2 border-white px-15 py-5 rounded-2xl text-2xl font-bold bg-white text-black cursor-pointer">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactTeam;
