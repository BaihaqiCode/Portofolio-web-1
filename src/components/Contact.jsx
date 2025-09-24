// src/components/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const Contact = () => {
  // State untuk mengelola data form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State untuk mengelola status pengiriman
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: false });

    try {
      // GANTI URL DI BAWAH INI DENGAN URL FORM ANDA DARI FORMSPREE
      const response = await fetch("https://formspree.io/f/xldpenan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ submitting: false, submitted: true, error: false });
        setFormData({ name: "", email: "", message: "" }); // Reset form setelah berhasil
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setStatus({ submitting: false, submitted: false, error: true });
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">
        Get in <span className="text-cyan-400">Touch</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 bg-slate-800 p-8 rounded-lg"
      >
        {/* Kolom Informasi Kontak */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
          <p className="text-slate-300 mb-6">
            Feel free to reach out to me any time. I prefer to discuss new
            projects over email.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Mail className="text-cyan-400" />
              <span>baihaqicode2715@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-cyan-400" />
              <span>+6285959305145</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-cyan-400" />
              <span>Jonggol, West Java, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Kolom Form */}
        <div className="flex-1">
          {/* Form sekarang menggunakan onSubmit */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                placeholder="Mr. Baihaqi"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                placeholder="Baihaqi@gmail.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                placeholder="Your message..."
              ></textarea>
            </div>

            {/* Tombol submit dengan status dinamis */}
            <motion.button
              type="submit"
              disabled={status.submitting}
              whileHover={{ scale: status.submitting ? 1 : 1.05 }}
              whileTap={{ scale: status.submitting ? 1 : 0.95 }}
              className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {status.submitting ? "Sending..." : "Send Message"}{" "}
              <Send size={18} />
            </motion.button>

            {/* Pesan status setelah submit */}
            {status.submitted && (
              <div className="mt-4 text-green-400 flex items-center gap-2">
                <CheckCircle size={20} /> Message sent successfully!
              </div>
            )}
            {status.error && (
              <div className="mt-4 text-red-400 flex items-center gap-2">
                <AlertTriangle size={20} /> Something went wrong. Please try
                again.
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
