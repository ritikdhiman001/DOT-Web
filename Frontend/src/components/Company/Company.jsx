import DetailPage from "./DetailPage";
import Slider from "react-slick";

const Company = () => {
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    cssEase: "linear",
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  const companies = [
    {
      id: 1,

      src: "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667095/carousel1_m1paur.png",

      alt: "company 1",
    },

    {
      id: 2,

      src: "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667368/carousel2_sw7gbm.png",

      alt: "company 2",
    },

    {
      id: 3,

      src: "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667381/carousel3_wt0vwm.png",

      alt: "company 3",
    },

    {
      id: 4,

      src: "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667380/carousel4_qjkmkr.png",

      alt: "company 4",
    },

    {
      id: 5,

      src: "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667381/carousel5_e6wffe.png",

      alt: "company 5",
    },

    {
      id: 6,

      src: "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667380/carousel6_i8svdb.png",

      alt: "company 6",
    },
  ];

  return (
    <div className="w-full bg-white overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="text-center mb-8 md:mb-14">
          <h1 className="text-xl md:text-3xl font-bold leading-tight">
            We Provide Certifications for Trainings Mandated by
          </h1>
        </div>

        <Slider {...settings} className="company-slider">
          {companies.map((company) => (
            <div key={company.id} className="outline-none">
              <div className="flex justify-center items-center h-16 md:h-24 px-4">
                <img
                  src={company.src}
                  alt={company.alt}
                  className="max-h-12 md:max-h-16 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <div className="mt-12 md:mt-24">
        <DetailPage />
      </div>
    </div>
  );
};

export default Company;
