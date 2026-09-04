import React, { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

export default function Navbar() {
  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("app_lang") === "ar";
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, []);

  const toggleLanguage = () => {
    const nextState = !isArabic;
    setIsArabic(nextState);
    
    document.documentElement.dir = nextState ? "rtl" : "ltr";
    document.documentElement.lang = nextState ? "ar" : "en";
    
    localStorage.setItem("app_lang", nextState ? "ar" : "en");
    window.dispatchEvent(new CustomEvent("languageChange", { detail: { isArabic: nextState } }));
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setIsSubmitted(false);
    setFormData({ name: "", email: "", phone: "", date: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <header className="absolute top-0 left-0 z-50 w-full bg-gradient-to-b from-black/60 via-black/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
          <a href="#home" className="flex items-center" aria-label="Bahrain Surf Park Home">
            <img
              src="/Bahrain-Surf-Park-Logo-removebg-preview.png"
              alt="Bahrain Surf Park Logo"
              className="h-20 md:h-24 w-auto object-contain drop-shadow-md"
            />
          </a>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Arabic"
              className="text-sm font-semibold text-white drop-shadow hover:text-[#00E599] transition-colors cursor-pointer"
            >
              {isArabic ? "EN | English" : "AR | العربية"}
            </button>

            <button
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#00E599] text-[#0077B6] font-bold text-sm shadow-md hover:opacity-95 transition-opacity"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-20 h-20 text-[#00E599] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#004658] mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you, {formData.name}. We will contact you shortly to confirm your slot.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full bg-[#004658] text-white py-3 rounded-xl font-semibold hover:bg-[#003543] transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-[#004658] mb-1">Book Your Surf</h3>
                  <p className="text-sm text-gray-500 mb-6">Fill in your details to reserve a session.</p>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00E599] focus:border-transparent outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00E599] focus:border-transparent outline-none"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00E599] focus:border-transparent outline-none"
                          placeholder="+973..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00E599] focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 bg-[#00E599] text-[#0077B6] py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}