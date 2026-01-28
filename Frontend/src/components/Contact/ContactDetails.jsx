import ContactForm from "/ContactForm.png";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Footer from "../Navbar-Footer/Footer";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ContactDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
      );
      toast.success(res.data.message);
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
          <InfoCard
            icon={<Phone />}
            title="Phone"
            main="(307) 429-4946"
            sub="Mon-Fri 8AM-6PM EST"
          />
          <InfoCard
            icon={<Mail />}
            title="Email"
            main="info@dotcouncil.org"
            sub="We respond within 24 hours"
          />

          <InfoCard
            icon={<MapPin />}
            title="Address"
            main="30 N Gould St Ste R, Sheridan"
            sub="Wyoming, 82801"
          />

          <InfoCard
            icon={<Clock />}
            title="Business Hours"
            main="Monday – Friday"
            sub="8:00 AM – 6:00 PM EST"
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-8">
            <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-6 text-[16px]">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-[14px]">
                    Full Name <span className="text-red-600 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    className={`px-3 py-2 border rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                    onChange={handleChange}
                    value={formData.fullName}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-[14px]">
                    Email Address{" "}
                    <span className="text-red-600 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    className={`px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    onChange={handleChange}
                    value={formData.email}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company */}
                <div className="flex flex-col gap-1">
                  <label className="text-[14px]">Company Name</label>
                  <input
                    name="company"
                    className="px-3 py-2 border rounded-md border-gray-300"
                    placeholder="Company Name"
                    onChange={handleChange}
                    value={formData.company}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-[14px]">Phone Number</label>
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    className={`px-3 py-2 border rounded-md ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px]">
                  Subject <span className="text-red-600 text-xl">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className={`px-3 py-2 border rounded-md ${errors.subject ? "border-red-500" : "border-gray-300"}`}
                  onChange={handleChange}
                  value={formData.subject}
                />
                {errors.subject && (
                  <p className="text-red-600 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px]">
                  Message <span className="text-red-600 text-xl">*</span>
                </label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Tell us about your needs..."
                  className={`px-3 py-2 border rounded-md ${errors.message ? "border-red-500" : "border-gray-300"}`}
                  onChange={handleChange}
                  value={formData.message}
                />
                {errors.message && (
                  <p className="text-red-600 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 cursor-pointer"
                type="submit"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
          <div className="space-y-6 ">
            <img
              src={ContactForm}
              alt="Support Team"
              className="rounded-xl w-full object-cover"
            />
            <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6">
              <h3 className="font-bold text-lg mb-2">Need Immediate Help?</h3>
              <p className="text-gray-600 mb-2">
                For urgent compliance questions or technical support, call our
                dedicated support line:
              </p>
              <p className="text-blue-600 font-semibold flex items-center gap-2">
                <Phone size={18} /> (307) 429-4946
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Available Monday–Friday, 8AM–6PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

function InfoCard({ icon, title, main, sub }) {
  return (
    <div className=" rounded-xl border-3 p-6 text-center border-gray-300 hover:border-[#1E40AF] transition duration-500">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="font-semibold text-[18px]">{title}</h3>
      <p className="mt-1 text-[16px]">{main}</p>
      <p className="text-sm text-gray-500 mt-1 text-[14px]">{sub}</p>
    </div>
  );
}

export default ContactDetails;
