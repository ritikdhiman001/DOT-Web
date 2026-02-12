import React from "react";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import Company from "../Company/Company";
import ContectTeam from "../Contact/ContactTeam";
import Footer from "../Navbar-Footer/Footer";
import MandatoryCourse from "../Courses/MandatoryCourse";
import ComplianceServices from "../CompliancePages/ComplianceServices";
import CompliancePage from "../CompliancePages/CompliancePage";

const HeroPage = () => {
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 1100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const state = [
    { label: "Professionals Trained", value: "50,000+" },
    { label: "Expert Courses", value: "200+" },
    { label: "Certification rate", value: "98%" },
    { label: "Learning Support", value: "24/7" },
  ];

  return (
    <>
      <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Slider {...settings}>
            <div className="relative h-[80vh] md:h-screen">
              <img
                src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769585357/Homehero1_q79ckk.png"
                alt="Hero 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />{" "}
            </div>
            <div className="relative h-[80vh] md:h-screen">
              <img
                src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769585476/Homehero2_ycgf1l.png"
                alt="Hero 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </Slider>
        </div>

        <div className="relative flex items-center h-full px-6 md:px-20 lg:px-40 text-white fadeInUp-animation">
          <div className="max-w-4xl pt-10 md:pt-0">
            <h1 className="text-xl md:text-4xl mb-2">Everything You Need to</h1>
            <h2 className="text-3xl md:text-6xl font-bold mb-4">
              Stay Road-Ready.
            </h2>
            <p className="text-xs md:text-lg leading-relaxed mb-6 md:mb-8 opacity-90">
              Our courses help you reduce safety risks, avoid costly violations,
              and protect your business while building a culture of
              accountability. Empower your team with expert-led training fully
              compliant with DOT regulations.
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center justify-center bg-white text-black px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base rounded-xl font-bold transition-all w-fit"
            >
              Start Learning
              <HiOutlineArrowSmallRight className="text-lg md:text-2xl ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[95%] md:max-w-[90%] -mt-10 md:-mt-20 mx-auto relative z-20 fadeInUp-animation">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-[#f0f6fc] py-6 md:py-10 px-4 md:px-6 rounded-3xl md:rounded-[40px] shadow-lg">
          {state.map((stat, id) => (
            <div key={id} className="text-center">
              <h3 className="font-bold text-lg md:text-3xl">{stat.value}</h3>
              <p className="text-gray-600 text-[10px] md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Company />
        <MandatoryCourse
          title="Mandatory Trainings"
          description="Get certified in essential DOT compliance areas"
        />
        <ComplianceServices />
        <CompliancePage />
        <ContectTeam />
      </div>
    </>
  );
};

export default HeroPage;
