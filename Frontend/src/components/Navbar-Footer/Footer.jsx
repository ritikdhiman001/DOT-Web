import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#050F2C] text-white md:py-16 py-10 px-7">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667900/logofooter_xtk7u1.svg"
              alt="DOT Council"
              className="w-32 h-auto mb-4"
            />
            <p className="text-sm leading-relaxed max-w-sm">
              Leading provider of DOT compliance training for transportation
              companies. Ensuring safety and regulatory compliance across the
              trucking industry.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="md:text-2xl text-[20px] font-semibold mb-4 mt-2 md:mt-0">
              Quick Links
            </h3>
            <ul className="space-y-3 md:text-[20px] list-inside md:list-disc inline-block md:block text-left">
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

          <div className="text-center md:text-left">
            <h3 className="text-[20px] md:text-2xl font-semibold mb-5">
              Contact Info
            </h3>
            <ul className="space-y-4 md:text-[20px] text-[16px] inline-block md:block text-left">
              <li className="flex items-center gap-3">
                <Phone className="h-5 md:h-7 shrink-0" /> (307) 429-4946
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 md:h-7 shrink-0" /> info@dotcouncil.org
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 md:h-7 shrink-0" />
                <span>
                  30 N Gould St Ste R, Sheridan,
                  <br className="hidden md:block" /> Wyoming, 82801
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center 2xl:text-[21px] md:text-[18px] text-[13px] leading-loose">
          <p>© 2026 DOT Council. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
