import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Company from "../Company/Company";
import { Link } from "react-router-dom";
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
      <section className="relative w-full h-screen overflow-hidden ">
        {/* Slider */}
        <div className="w-full -z-10">
          <Slider {...settings} className="-z-10">
            <img
              src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769585357/Homehero1_q79ckk.png"
              alt="Hero 1"
              className="w-full h-screen object-cover"
            />
            <img
              src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769585476/Homehero2_ycgf1l.png"
              alt="Hero 2"
              className="w-full h-screen object-cover"
            />
          </Slider>
        </div>
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center pt-10 md:pt-0 ">
          <div className="px-6 md:px-20 lg:px-40 text-white max-w-4xl">
            <h1 className="text-2xl md:text-4xl mb-2">
              Everything You Need to
            </h1>

            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Stay Road-Ready.
            </h2>

            <p className="text-sm md:text-lg leading-relaxed mb-8">
              Our courses help you reduce safety risks, avoid costly violations,
              and protect your business all while building a culture of
              accountability and operational excellence. Empower your team with
              expert-led, up-to-date training designed to keep your operations
              fully compliant with Department of Transportation regulations.
            </p>

            <Link
              to="/register"
              className="group inline-flex items-center justify-center bg-white text-black sm:px-8 sm:py-2 md:px-6 md:py-2 text-sm md:text-[16px] rounded-xl font-bold  transition-all duration-300
             w-fit cursor-pointer"
            >
              Start Learning
              <HiOutlineArrowSmallRight className="md:text-2xl text-[18px] ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Stats Section */}
      </section>
      <div className="max-w-[90%] mt-10 md:-mt-17.75 mx-auto my-0 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#f0f6fc] py-10 px-6 rounded-[40px] shadow-lg ">
          {state.map((stat, id) => (
            <div key={id} className="text-center ">
              <h3 className="font-bold text-lg md:text-3xl mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Company />
      <MandatoryCourse />
      <ComplianceServices />
      <CompliancePage />
      <ContectTeam />
      <Footer />
    </>
  );
};

export default HeroPage;
