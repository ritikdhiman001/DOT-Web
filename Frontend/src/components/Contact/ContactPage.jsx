import React from "react";
import ContactDetails from "./ContactDetails";

const ContactPage = () => {
  return (
    <div>
      <section className="relative min-h-[60vh] md:h-screen w-full flex flex-col justify-center overflow-hidden">
        <img
          src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769586550/ContactHero_ikazjd.jpg"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-20 px-[6%] pt-20 md:pt-0 ">
          <h1 className="text-[45px] md:text-6xl md:mb-7 mb-4 text-blue-600 md:text-blue-800 font-bold leading-tight">
            Contact <span className="text-white">Us</span>
          </h1>
          <h2 className="text-[17px] md:text-xl text-white mb-4 max-w-2xl leading-relaxed">
            Have questions about our training programs? Need help with
            compliance? Our team of experts is here to help you succeed.
          </h2>
        </div>
      </section>

      <ContactDetails />
    </div>
  );
};

export default ContactPage;
