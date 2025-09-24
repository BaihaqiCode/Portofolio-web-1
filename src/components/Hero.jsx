// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const Hero = () => {
  return (
    // Pastikan section ini mengisi seluruh tinggi layar dan TIDAK punya warna background
    <section className="h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-4">
      {/* Kolom Teks */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Hi, I'm <span className="text-cyan-400">Baihaqi Abdul Hakim</span>
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-slate-300">
          A Passionate Full Stack Web Developer
        </p>

        <motion.a
          href="/cv_palsu.txt" // Sesuaikan path CV Anda
          download="cv_palsu.txt"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg mx-auto md:mx-0"
        >
          Download CV <Download />
        </motion.a>
      </motion.div>

      {/* Kolom Gambar/Avatar */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <img
          src="/profil.png" // Sesuaikan path gambar Anda
          alt="Foto Profil Baihaqi Abdul Hakim"
          className="w-60 h-60 md:w-80 md:h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full object-cover"
        />
      </motion.div>
    </section>
  );
};

export default Hero;