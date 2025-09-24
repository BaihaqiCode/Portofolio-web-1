// src/components/Navbar.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // --- PERUBAHAN UTAMA: VARIAN ANIMASI DENGAN CLIP-PATH ---
  // Animasi sekarang menggunakan clip-path untuk efek "menyebar" dari samping
  const menuVariants = {
    hidden: {
      // Menu dimulai sebagai lingkaran kecil di pojok kanan atas, di posisi tombol
      clipPath: "circle(24px at calc(100% - 44px) 44px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.4,
      },
    },
    visible: {
      // Lingkaran membesar hingga menutupi seluruh layar
      clipPath: "circle(150vh at calc(100% - 44px) 44px)",
      transition: {
        type: "spring",
        stiffness: 80,
        restDelta: 2,
        staggerChildren: 0.1,
        delayChildren: 0.2, // Beri jeda sebelum item muncul
      },
    },
  };

  const menuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex justify-between items-center py-4 px-8 sticky top-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm z-50"
      >
        <a href="#" className="flex items-center gap-2">
          <Code size={28} className="text-cyan-400" />
          <span className="text-xl font-bold">BaihaqiCode</span>
        </a>

        <ul className="hidden md:flex gap-8">
          <li>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-cyan-400 transition-colors"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/6285959305145?text=saya%20tertarik%20untuk%20konsultasi%20pekerjaan"
              target="_blank"
              className="hover:text-cyan-400 transition-colors"
            >
              Whatsapp
            </a>
          </li>
        </ul>

        {/* Tombol hamburger harus punya z-index lebih tinggi dari panel menu */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          // --- PERUBAHAN UTAMA: LAYOUT KEMBALI FULL-SCREEN ---
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 flex flex-col items-center justify-center gap-8 bg-slate-900 z-40 md:hidden"
          >
            <motion.li variants={menuItemVariants}>
              <a
                href="#skills"
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:text-cyan-400"
              >
                Skills
              </a>
            </motion.li>
            <motion.li variants={menuItemVariants}>
              <a
                href="#projects"
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:text-cyan-400"
              >
                Projects
              </a>
            </motion.li>
            <motion.li variants={menuItemVariants}>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:text-cyan-400"
              >
                Contact
              </a>
            </motion.li>
            <motion.li variants={menuItemVariants}>
              <a
                href="https://wa.me/6285959305145?text=saya%20tertarik%20untuk%20konsultasi%20pekerjaan"
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:text-cyan-400"
                target="_blank"
              >
                Whatsapp
              </a>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
