import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Footer from "../Navbar-Footer/Footer";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactDetails = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
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
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${baseUrl}/api/contact`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      <div className="min-h-screen px-4 md:px-6 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
          <InfoCard
            icon={<Phone className="text-blue-800" />}
            title="Phone"
            main="(307) 429-4946"
            sub="Mon-Fri 8AM-6PM"
          />
          <InfoCard
            icon={<Mail className="text-blue-800" />}
            title="Email"
            main="info@dotcouncil.org"
            sub="Within 24 hours"
          />
          <InfoCard
            icon={<MapPin className="text-blue-800" />}
            title="Address"
            main="30 N Gould St Ste R"
            sub="Sheridan, WY"
          />
          <InfoCard
            icon={<Clock className="text-blue-800" />}
            title="Hours"
            main="Mon – Fri"
            sub="8AM – 6PM EST"
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Send us a Message
            </h2>
            <p className="text-gray-600 mb-8 text-sm md:text-base">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    className={`px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.fullName ? "border-red-500" : "border-gray-200"}`}
                    onChange={handleChange}
                    value={formData.fullName}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    className={`px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? "border-red-500" : "border-gray-200"}`}
                    onChange={handleChange}
                    value={formData.email}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Company Name
                  </label>
                  <input
                    name="company"
                    className="px-4 py-3 border rounded-xl border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Logistics Inc."
                    onChange={handleChange}
                    value={formData.company}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    placeholder=""
                    className="px-4 py-3 border rounded-xl border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  className={`px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.subject ? "border-red-500" : "border-gray-200"}`}
                  onChange={handleChange}
                  value={formData.subject}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Your message here..."
                  className={`px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.message ? "border-red-500" : "border-gray-200"}`}
                  onChange={handleChange}
                  value={formData.message}
                />
              </div>

              <button
                className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95 shadow-lg cursor-pointer"
                type="submit"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-8">
            <div className="hidden lg:block relative h-100 overflow-hidden rounded-2xl group">
              <img
                src="https://res.cloudinary.com/dpqggtyjw/image/upload/v1769666999/ContactForm_xsp73d.png"
                alt="Support Team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            </div>

            <div className=" rounded-2xl p-8 shadow-xl">
              <h3 className="font-bold text-xl md:text-2xl mb-4">
                Need Immediate Help?
              </h3>
              <p className=" mb-6 leading-relaxed">
                For urgent compliance questions or technical support, reach out
                to our team directly.
              </p>
              <div className="space-y-4">
                <a
                  href="tel:7696126769"
                  className="flex items-center gap-3 text-lg font-bold transition-colors"
                >
                  <div className="p-2  rounded-lg">
                    <Phone size={20} />
                  </div>{" "}
                  7696126769
                </a>
                <div className="flex items-center gap-3 text-sm ">
                  <Clock size={18} /> Available Mon–Fri, 8AM–6PM EST
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function InfoCard({ icon, title, main, sub }) {
  return (
    <div className="bg-white rounded-2xl border-2 p-4 md:p-6 text-center border-gray-100 hover:border-blue-800 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-center mb-3 text-blue-800">{icon}</div>
      <h3 className="font-bold text-sm md:text-base text-gray-900">{title}</h3>
      <p className="mt-1 text-xs md:text-sm font-semibold text-gray-700 truncate">
        {main}
      </p>
      <p className="text-[10px] md:text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

export default ContactDetails;
