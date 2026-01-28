import React from "react";
import contactBanner from "/ContactHero.jpg";
import ContactDetails from "./ContactDetails";

const ContactPage = () => {
  return (
    <div>
      <section className="relative w-full h-screen overflow-hidden">
        <div className="w-full -z-10">
          <img
            src={contactBanner}
            alt="img"
            className="w-full h-screen object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/20 z-10 flex items-end">
          <div className="absolute top-124 left-[5%] z-20 text-white">
            <h1 className="text-6xl mb-7 text-blue-800 font-bold">
              Contact <span className="text-white">Us</span>
            </h1>
            <h2 className="text-xl mb-4 max-w-2xl">
              Have questions about our training programs? Need help with
              compliance? Our team of experts is here to help you succeed.
            </h2>
          </div>
        </div>
      </section>
      <ContactDetails />
    </div>
  );
};

export default ContactPage;
