import comp1 from "/carousel1.png";
import comp2 from "/carousel2.png";
import comp3 from "/carousel3.png";
import comp4 from "/carousel4.png";
import comp6 from "/carousel6.png";
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
      src: comp1,
      alt: "company 1",
    },
    {
      id: 2,
      src: comp2,
      alt: "company 2",
    },
    {
      id: 3,
      src: comp3,
      alt: "company 3",
    },
    {
      id: 4,
      src: comp4,
      alt: "company 4",
    },
    {
      id: 6,
      src: comp6,
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
