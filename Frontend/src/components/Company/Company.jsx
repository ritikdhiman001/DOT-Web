import DetailPage from "./DetailPage";
import Slider from "react-slick";

const Company = () => {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 1100,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
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
      alt: "company 4",
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/dpqggtyjw/image/upload/v1769667380/carousel6_i8svdb.png",
      alt: "company 6",
    },
  ];
  return (
    <>
      <section className="sec-container">
        <div className="text-center mb-10 pt-22">
          <h1 className="md:text-3xl text-lg font-bold leading-tight px-2">
            We Provide Certifications for Trainings Mandated by
          </h1>
        </div>

        <Slider {...settings}>
          {companies.map((company) => (
            <div key={company.id}>
              <div className="flex justify-center items-center h-full">
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-16 object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <DetailPage />
    </>
  );
};

export default Company;
