import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="">
      <div className="bg-[#050F2C] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <img
              src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667900/logofooter_xtk7u1.svg"
              alt="DOT Council"
              className="w-32 mb-4"
            />
            <p className="text-sm leading-relaxed max-w-sm">
              Leading provider of DOT compliance training for transportation
              companies. Ensuring safety and regulatory compliance across the
              trucking industry.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Qucik Links</h3>
            <ul className="space-y-3 text-[20px] list-disc">
              <li>
                <Link to="/courses" className="hover:underline">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:underline">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[24px] font-semibold mb-5">Contact Info</h3>
            <ul className="space-y-4 text-[20px] ">
              <li className="flex items-center gap-3">
                <Phone size={22} /> (307) 429-4946
              </li>
              <li className="flex items-center gap-3">
                <Mail size={22} /> info@dotcouncil.org
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={22} />
                <span>
                  30 N Gould St Ste R, Sheridan,
                  <br /> Wyoming, 82801
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center 2xl:text-[21px] md:text-[16px]">
          © 2026 DOT Council. All rights reserved.{" "}
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
